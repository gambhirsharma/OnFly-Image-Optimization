import { createClient } from 'jsr:@supabase/supabase-js@2'
import {
  ImageMagick,
  initializeImageMagick,
  MagickFormat,
} from "npm:@imagemagick/magick-wasm@0.0.30";


const supabase =  createClient(
  Deno.env.get('MY_SUPABASE_URL') ?? '', 
  Deno.env.get('MY_SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )

export const handler = async (req: Request) => {
  // int the imagemagick libarary
  const wasmBytes = await Deno.readFile(
    new URL("magick.wasm", import.meta.resolve("npm:@imagemagick/magick-wasm@0.0.30"))
  );
  await initializeImageMagick(wasmBytes);

  // 1. Get the data from the URL
   const url = new URL(req.url);
   const pathParts = url.pathname.split('/');
   const imageId = pathParts[pathParts.length - 1];
   // const params = Object.fromEntries(url.searchParams.entries());
  const searchParams = url.searchParams;

    // Query transformation parameters
  const width = searchParams.get('w') ? parseInt(searchParams.get('w')!) : null;
  const height = searchParams.get('h') ? parseInt(searchParams.get('h')!) : null;
  const formatParam = searchParams.get('format') || 'webp';
  const quality = searchParams.get('q') ? parseInt(searchParams.get('q')!) : 80;
  const fit = searchParams.get('fit') || 'cover';

  if(!imageId){
    return new Response(
      JSON.stringify({error: "Image Id not found in the URL"}), {
        status: 400
      }
    )
  }

  // 2. find the image form the db
  const { data: imagePath, error: dbError } = await supabase
  .from('image_assets')
  .select('file_path')
  .eq('id', imageId)
  .single();

  // const responseData = {
  //   message: "Working", 
  //   path:imagePath 
  // }

  if(dbError){
    return new Response(
      JSON.stringify({message: `Error: ${dbError.message}`, id: imageId}),
      {status: 500}
    )
  }

  // 3. Get the image for the bucket
  const { data: imageData, error: storageError } = await supabase
    .storage
    .from('upload-image')
    .download(imagePath.file_path);

  if(storageError || !imageData){
    return new Response(JSON.stringify({
      error: storageError.message,
      path: imagePath.file_path
    }), {status: 500})
  }

  const inputBuffer = new Uint8Array(await imageData.arrayBuffer());

  // 4. Transform image
  const outputBuffer = ImageMagick.read(inputBuffer, (img) => {
    // Resize with optional fit
    if (width || height) {
      if (fit === 'cover' && width && height) {
        img.resize(width, height);
        img.crop(width, height, 0, 0);
      } else {
        img.resize(width ?? 0, height ?? 0);
      }
    }
    // TODO: add the quality param feature
    //
    // Set quality
    // img.quality(quality);
    // Write out in requested format
    return img.write((data) => data, MagickFormat[formatParam.toUpperCase() as keyof typeof MagickFormat]);
  });

  // 5. Return transformed image
  const contentTypeMap: Record<string, string> = {
    webp: 'image/webp',
    png: 'image/png',
    jpeg: 'image/jpeg',
    jpg: 'image/jpeg',
  };
  const contentType = contentTypeMap[formatParam.toLowerCase()] || 'application/octet-stream';

  return new Response(outputBuffer, {
    headers: { 'Content-Type': contentType }
  });
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/imgs' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

