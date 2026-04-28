// app/img/[id]/route.ts
import sharp from 'sharp';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { createServiceRoleClient } from '@/utils/supabase/service';

const ALLOWED_FORMATS = ['webp', 'jpeg', 'jpg', 'png', 'avif'];
const ALLOWED_FIT_VALUES = ['cover', 'contain', 'fill', 'inside', 'outside'];
const MIN_QUALITY = 1;
const MAX_QUALITY = 100;
const MAX_DIMENSION = 8192;
const MIN_DIMENSION = 1;

function validateAndParseInt(value: string | null, min: number, max: number, defaultValue: number): number {
  if (value === null) return defaultValue;
  const parsed = parseInt(value, 10);
  if (isNaN(parsed) || parsed < min || parsed > max) return defaultValue;
  return parsed;
}

export async function GET(
    request: NextRequest,
) {
  const url = new URL(request.url);

  const pathMatch = url.pathname.match(/\/img\/([^\/]+)/);
  const imageId = pathMatch?.[1];

  if (!imageId || typeof imageId !== 'string' || imageId.length > 100) {
    return new NextResponse(JSON.stringify({ error: 'Invalid image ID', id: imageId }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  if (!uuidRegex.test(imageId)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid image ID format' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const { searchParams } = new URL(request.url);
    
    const rawWidth = searchParams.get('w');
    const rawHeight = searchParams.get('h');
    const rawFormat = searchParams.get('format');
    const rawQuality = searchParams.get('q');
    const rawFit = searchParams.get('fit');
    
    const width = validateAndParseInt(rawWidth, MIN_DIMENSION, MAX_DIMENSION, -1);
    const height = validateAndParseInt(rawHeight, MIN_DIMENSION, MAX_DIMENSION, -1);
    const quality = validateAndParseInt(rawQuality, MIN_QUALITY, MAX_QUALITY, 80);
    
    const format = (rawFormat?.toLowerCase() || 'webp') as string;
    if (!ALLOWED_FORMATS.includes(format)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid format', allowed: ALLOWED_FORMATS }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
    
    const fit = (rawFit?.toLowerCase() || 'cover') as string;
    if (!ALLOWED_FIT_VALUES.includes(fit)) {
      return new NextResponse(JSON.stringify({ error: 'Invalid fit parameter', allowed: ALLOWED_FIT_VALUES }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const supabaseService = await createServiceRoleClient();
    const supabase = await createClient();
    
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data: imageAsset, error: dbError } = await supabaseService
      .from('image_assets')
      .select('file_path, user_id')
      .eq('id', imageId)
      .single();

    if (dbError || !imageAsset) {
      return new NextResponse('Image not found', { status: 404 });
    }
    
    if (imageAsset.user_id && imageAsset.user_id !== user?.id) {
      return new NextResponse('Unauthorized', { status: 403 });
    }

    const { data: imageData, error: storageError } = await supabaseService
        .storage
        .from('upload-image')
        .download(imageAsset.file_path);

    if (storageError) {
        return new NextResponse(JSON.stringify({
            error: "Failed to retrieve the image", 
            details: storageError.message
        }), { 
            status: 500, 
            headers: {
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

    const cacheKey = `${imageId}_${width}_${height}_${format}_${quality}_${fit}`;
    const transformFileName = `${cacheKey.replace(/[^a-zA-Z0-9]/g, '_')}.${format}`;
    
    const { data: existingImage, error: existingError } = await supabaseService
        .storage
        .from('transform-images')
        .download(transformFileName);

    let imageBuffer: Buffer;

    if (existingImage && !existingError) {
        imageBuffer = Buffer.from(await existingImage.arrayBuffer());
    } else {
        const buffer = await imageData.arrayBuffer();
        let image = sharp(Buffer.from(buffer));
        
        if (width !== -1 || height !== -1) {
           image = image.resize({
            width: width !== -1 ? width : undefined,
            height: height !== -1 ? height : undefined,
            fit: fit as keyof sharp.FitEnum,
            withoutEnlargement: true,
           });
        }

        imageBuffer = await image
           .toFormat(format as keyof sharp.FormatEnum, { quality })
           .toBuffer();
           
        if (imageBuffer.length > 50 * 1024 * 1024) {
          return new NextResponse(JSON.stringify({ error: 'Image too large after processing' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
          });
        }
    }

    if (!existingImage || existingError) {
        await supabaseService
            .storage
            .from('transform-images')
            .upload(transformFileName, imageBuffer, {
                contentType: `image/${format}`,
                upsert: true,
                cacheControl: '86400',
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
    }

    const etag = Buffer.from(imageBuffer).toString('base64').substring(0, 32);
    
    return new NextResponse(imageBuffer, {
       headers: {
           'Content-Type': `image/${format}`,
           'Cache-Control': 'public, max-age=31536000, immutable',
           'ETag': `"${etag}"`,
           'X-Content-Type-Options': 'nosniff',
           'X-Frame-Options': 'DENY',
       }
    });
  }
  catch(error) {
    return NextResponse.json({"error": "Internal server error"}, { status: 500 });
  }
}
