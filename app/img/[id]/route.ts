// app/img/[id]/route.ts
//import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client'
//
//export const runtime = 'edge'; // Optional: Use edge runtime for better performance
//

export async function GET(
    request: NextRequest,
 // context: { params: { id: string } }
) {

    // const { params } = context;
    // const imageId = params.id;
  const url = new URL(request.url);

  // ✅ extract the ID manually from the pathname
  const pathMatch = url.pathname.match(/\/img\/([^\/]+)/);
  const imageId = pathMatch?.[1];

  if (!imageId) {
    return new NextResponse(JSON.stringify({ error: 'Image ID not found in URL', id: imageId }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
    try {
        // ** 0. get data from the url **
        // const imageId = params.id;
        const { searchParams } = new URL(request.url);
        // Parse transformation parameters
        const width = searchParams.get('w') ? parseInt(searchParams.get('w')!) : null;
        const height = searchParams.get('h') ? parseInt(searchParams.get('h')!) : null;
        const format = searchParams.get('format') || 'webp';
        const quality = searchParams.get('q') ? parseInt(searchParams.get('q')!) : 80;
        const fit = searchParams.get('fit') || 'cover';

        const supabase = createClient()

        // ** 1. first get the Image using the id **
        // get image location for the id
            const { data: imageAsset, error: dbError } = await supabase
              .from('image_assets')
              .select('file_path')
              .eq('id', imageId)
              .single();

            if (dbError || !imageAsset) {
              return new NextResponse('Image not found', { status: 404 });
            }
        // Get the original image from storage
        //
        const { data: imageData, error: storageError } = await supabase
            .storage
            .from('upload-image')
            .download(imageAsset.file_path);
        //
         // const { data: imageData, error: storageError } = await supabase
         // .storage
         // .from('upload-image')
         // .download(`images/picnew.jpeg`);

        // console.log(`image data: ${imageData}`)

        //const Img = imageData?.arrayBuffer();
        // const imageBuffer = await imageData?.arrayBuffer();
        //
        if (storageError) {
            return new NextResponse(JSON.stringify({
                mess: "fail to retrieve the image", 
                error: storageError, 
                path: imageAsset.file_path
                }), 
                { status: 500, headers: {
                'Content-Type': 'application/json',
            } }
            );
        }

        if (!imageData) {
        return new NextResponse(
            JSON.stringify({ mess: "No image data received" }),
            { status: 400, headers: { 'Content-Type': 'application/json' } }
        );
    }



        // ** 2. Check if transformed image already exists
            const transformFileName = `${imageId}_${width || 'auto'}x${height || 'auto'}_${format}_${quality}.${format}`;
            
            // Try to get existing transformed image
            const { data: existingImage, error: existingError } = await supabase
                .storage
                .from('transform-images')
                .download(transformFileName);

            let imageBuffer: Buffer;

            if (existingImage && !existingError) {
                // Use existing transformed image
                imageBuffer = Buffer.from(await existingImage.arrayBuffer());
                console.log('Using existing transformed image:', transformFileName);
            } else {
                // Transform the image
                const buffer = await imageData?.arrayBuffer();
                let image = sharp(Buffer.from(buffer));
                if (width !== null || height !== null) {
                   image = image.resize({
                    width: width ?? undefined,
                    height: height ?? undefined,
                       fit: fit as keyof sharp.FitEnum
                   });
                }

                imageBuffer = await image
                   .toFormat(format as keyof sharp.FormatEnum, { quality })
                   .toBuffer();
            }

        // ** 3. Store transformed image in transform bucket with 1-day expiration (only if we just created it)
            if (!existingImage || existingError) {
                const { error: uploadError } = await supabase
                    .storage
                    .from('transform-images')
                    .upload(transformFileName, imageBuffer, {
                        contentType: `image/${format}`,
                        upsert: true,
                        cacheControl: '86400', // 1 day in seconds
                        metadata: {
                            originalId: imageId,
                            width: width?.toString() || 'auto',
                            height: height?.toString() || 'auto',
                            format: format,
                            quality: quality.toString(),
                            fit: fit,
                            createdAt: new Date().toISOString()
                        }
                    });

                if (uploadError) {
                    console.error('Failed to upload transformed image:', uploadError);
                    // Continue serving the image even if upload fails
                } else {
                    console.log('Successfully uploaded transformed image:', transformFileName);
                }
            }

        // ** 4. Now serve the transformed image
        return new NextResponse(imageBuffer, {
           headers: {
               'Content-Type': `image/${format}`,
               'Cache-Control': 'public, max-age=31536000',
               'ETag': `"${imageBuffer.length.toString(16)}"`
           }
        });
        // return NextResponse.json({"message": `the image path is ${imageAsset.file_path}`, "imageData": `Image data: ${Img}`})
        //
        // return new NextResponse(imageBuffer, {
        //    headers: { 'Content-Type': `image/${format}` /* etc */ }
        // });

        // return NextResponse.json({mess: "sucess"})
    }
    catch(error) {
        return NextResponse.json({"error": (error as Error).message})
    }
}
