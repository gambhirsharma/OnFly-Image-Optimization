## UI
    - [x] `/images` page that show all the uploaded images by a user
    - [x] get out of this protected route and crate a upload route or something better.
     > Note:  keeping the upload in the `/protected` route 

## Core
    - [x] Implement this in supabase functions and Vercel edge functions 
    - [ ] add image to `output-image` bucket and delete it only after 3-4 days
    - [ ] cache the image in the browser for 3-4 days

# Working on
- [x]  fix the UI
    - [x] Implement this in supabase functions and Vercel edge functions 

- [ ] DevOps
    - [ ] Use [Build time envs](https://github.com/expatfile/next-runtime-env/blob/development/docs/EXPOSING_CUSTOM_ENV.md) in nextjs docker image.
    - [ ] configure supabase helmchart with `front-end` deployment
    - [ ] Add Argo-cd
    - [] GitHub Actions
