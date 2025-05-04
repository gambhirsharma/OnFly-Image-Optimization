// app/image/[id]/route.ts
//import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/client'
//
//export const runtime = 'edge'; // Optional: Use edge runtime for better performance
//
export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {

    try {
        // ** 0. get data from the url **
        const imageId = params.id;
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

        //const Img = imageData?.arrayBuffer();
        const imageBuffer = imageData?.arrayBuffer();
        //
        if (storageError) {
            return new NextResponse(JSON.stringify({mess: "fail to retrieve the image", error: storageError, path: imageAsset.file_path}), { status: 500, headers: {
                'Content-Type': 'application/json',
            } });
        }

        // ** 2. Transform it and save it in new Bucket
            //const buffer = await imageData?.arrayBuffer();
            //let image = sharp(Buffer.from(buffer));
            //if (width || height) {
            //    image = image.resize({
            //        width,
            //        height,
            //        fit: fit as keyof sharp.FitEnum
            //    });
            //}
            //
            //const imageBuffer = await image
            //    .toFormat(format as keyof sharp.FormatEnum, { quality })
            //    .toBuffer();

        // 3. Now server it the transformed image
        //return new NextResponse(imageBuffer, {
        //    headers: {
        //        'Content-Type': `image/${format}`,
        //        'Cache-Control': 'public, max-age=31536000',
        //        'ETag': `"${imageBuffer.length.toString(16)}"`
        //    }
        //});
        //return NextResponse.json({"message": `the image path is ${imageAsset.file_path}`, "imageData": `Image data: ${Img}`})
        //return new NextResponse(imageBuffer, {
        //    headers: { 'Content-Type': `image/${format}` /* etc */ }
        //});
        return NextResponse.json({mess: "sucess"})
    }
    catch(error) {
        return NextResponse.json({"error": (error as Error).message})
    }
}
