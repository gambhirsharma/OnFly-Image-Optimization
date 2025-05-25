// import { createClient } from "./supabase";

const supabase =  createClient(
  Deno.env.get('SUPABASE_URL') ?? '', 
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
  )
// const supabase = createClient()
export const handler = async (req: Request) => {
  // Get the URL object
   const url = new URL(req.url);
   // Extract the path parts - the path will be like "/imgs/adflad"
   const pathParts = url.pathname.split('/');
   // The ID will be the last part after "/imgs/"
   const imageId = pathParts[pathParts.length - 1];
   // Get query parameters
   const params = Object.fromEntries(url.searchParams.entries());


  // 2. find the image form the db
  // const { data: imageAsset, error: dbError } = await supabase
  // .from('image_assets')
  // .select('file_path')
  // .eq('id', imageId)
  // .single();
   
   
   // Combine the data
   // const responseData = {
   //   imageId,
   //   params,
   //   // Include any JSON body data if present
   //   // body: req.headers.get('content-type')?.includes('application/json') 
   //     // ? await req.json().catch(() => ({})) 
   //     // : {}
   // };
  const responseData = {
    message: "It's all working"
  }

  // 1. get the id & parameters from the url
  // const data = {
  //   message: `Hello ${name}!`,
  // }

  return new Response(
    // JSON.stringify(data),
    // JSON.stringify({data}),
     JSON.stringify(responseData),
    { headers: { "Content-Type": "application/json" } },
  )
}


/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/imgs' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/

