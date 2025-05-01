import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { type FileError, type FileRejection, useDropzone } from 'react-dropzone'

const supabase = createClient()

interface FileWithPreview extends File { preview?: string
  errors: readonly FileError[]
}

export interface UploadResponse {
  name: string
  success: boolean
  message: string | undefined
  path?: string
  url?: string
  id?: string
}

type UseSupabaseUploadOptions = {
  /**
   * Name of bucket to upload files to in your Supabase project
   */
  bucketName: string
  /**
   * Folder to upload files to in the specified bucket within your Supabase project.
   *
   * Defaults to uploading files to the root of the bucket
   *
   * e.g If specified path is `test`, your file will be uploaded as `test/file_name`
   */
  path?: string
  /**
   * Allowed MIME types for each file upload (e.g `image/png`, `text/html`, etc). Wildcards are also supported (e.g `image/*`).
   *
   * Defaults to allowing uploading of all MIME types.
   */
  allowedMimeTypes?: string[]
  /**
   * Maximum upload size of each file allowed in bytes. (e.g 1000 bytes = 1 KB)
   */
  maxFileSize?: number
  /**
   * Maximum number of files allowed per upload.
   */
  maxFiles?: number
  /**
   * The number of seconds the asset is cached in the browser and in the Supabase CDN.
   *
   * This is set in the Cache-Control: max-age=<seconds> header. Defaults to 3600 seconds.
   */
  cacheControl?: number
  /**
   * When set to true, the file is overwritten if it exists.
   *
   * When set to false, an error is thrown if the object already exists. Defaults to `false`
   */
  upsert?: boolean
}

type UseSupabaseUploadReturn = ReturnType<typeof useSupabaseUpload>

const useSupabaseUpload = (options: UseSupabaseUploadOptions) => {
  const {
    bucketName,
    path,
    allowedMimeTypes = [],
    maxFileSize = Number.POSITIVE_INFINITY,
    maxFiles = 1,
    cacheControl = 3600,
    upsert = false,
  } = options

  const [files, setFiles] = useState<FileWithPreview[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [errors, setErrors] = useState<{ name: string; message: string | undefined }[]>([])
  const [successes, setSuccesses] = useState<string[]>([])
  // getting the uploaded URL
  const [fileUrls, setFileUrls] = useState<{name: string, signUrl: string, idUrl: string}[]>([])

  const isSuccess = useMemo(() => {
    if (errors.length === 0 && successes.length === 0) {
      return false
    }
    if (errors.length === 0 && successes.length === files.length) {
      return true
    }
    return false
  }, [errors.length, successes.length, files.length])

  const onDrop = useCallback(
    (acceptedFiles: File[], fileRejections: FileRejection[]) => {
      const validFiles = acceptedFiles
        .filter((file) => !files.find((x) => x.name === file.name))
        .map((file) => {
          ;(file as FileWithPreview).preview = URL.createObjectURL(file)
          ;(file as FileWithPreview).errors = []
          return file as FileWithPreview
        })

      const invalidFiles = fileRejections.map(({ file, errors }) => {
        ;(file as FileWithPreview).preview = URL.createObjectURL(file)
        ;(file as FileWithPreview).errors = errors
        return file as FileWithPreview
      })

      const newFiles = [...files, ...validFiles, ...invalidFiles]

      setFiles(newFiles)
    },
    [files, setFiles]
  )

  const dropzoneProps = useDropzone({
    onDrop,
    noClick: true,
    accept: allowedMimeTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {}),
    maxSize: maxFileSize,
    maxFiles: maxFiles,
    multiple: maxFiles !== 1,
  })

  const onUpload = useCallback(async () => {
    setLoading(true)

    // [Joshen] This is to support handling partial successes
    // If any files didn't upload for any reason, hitting "Upload" again will only upload the files that had errors
    const filesWithErrors = errors.map((x) => x.name)
    const filesToUpload =
      filesWithErrors.length > 0
        ? [
            ...files.filter((f) => filesWithErrors.includes(f.name)),
            ...files.filter((f) => !successes.includes(f.name)),
          ]
        : files


    //const responses: UploadResponse[] = await Promise.all(
    //  filesToUpload.map(async (file) => {
        // 1. Upload the image to bucket
        //const { data: uploadData, error: uploadError } = await supabase.storage
        //  .from(bucketName)
        //  .upload(!!path ? `${path}/${file.name}` : file.name, file, {
        //    cacheControl: cacheControl.toString(),
        //    upsert,
        //  })
        //
        //if (uploadError) { return { name: file.name, success: false, message: uploadError.message }; }
        //
        //else {
        //  console.log('Upload data:', uploadData)
        //
        //  // 2. Get the public URL for the uploaded file
        //  //const filePath = !!path ? `${path}/${file.name}` : file.name
        //  //console.log('File path:', filePath)
        //  const filePath = uploadData.path
        //  const { data: urlData, error: urlError } = await supabase.storage
        //    .from(bucketName)
        //    .createSignedUrl(filePath, 60 * 60)
        //  //
        //  if (urlError) { return { name: file.name, success: false, message: `Upload succeeded but failed to create signed URL: ${urlError.message}`, path: filePath }; }
          //
          // 4. Store mapping in database
          //const { data: imageRecord, error: dbError } = await supabase
          //  .from('image_assets')
          //  .insert({
          //    file_path: filePath,
          //    original_name: file.name,
          //    mime_type: file.type,
          //    size: file.size
          //  })
          //  .select()
          //  .single();
          //
          //if (dbError) {
          //  return {name: file.name,success: false,message: `Upload and URL creation succeeded but database insertion failed: ${dbError.message}`,path: filePath,url: urlData.signedUrl};}
          //
    //      return {
    //        name: file.name,
    //        success: true,
    //        message: '{:ok} -> Upload completed successfully',
    //        path: filePath,
    //        url: urlData?.signedUrl,
    //        //id: imageRecord.id
    //      };
    //    }
    //  })
    //)
    //
    const responses:UploadResponse[] = await Promise.all(
      filesToUpload.map(async (file) => {
        try {
           // 1. Upload the file to bucket
        const filePath = path ? `${path}/${file.name}` : file.name;
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from(bucketName)
          .upload(filePath, file, {
            cacheControl: cacheControl.toString(),
            upsert,
          });

        if (uploadError) throw new Error(`Upload failed: ${uploadError.message}`);

        // 2. Get the public URL for the uploaded file
        const storedFilePath = uploadData.path;
        //const storedFilePath =  !!path ? `${path}/${file.name}` : file.name

        const { data: urlData, error: urlError } = await supabase.storage
          .from(bucketName)
          .createSignedUrl(storedFilePath, 60 * 60);

        if (urlError) throw new Error(`Failed to create signed URL: ${urlError.message}`);

        // 3. Store mapping in database
        const { data: imageRecord, error: dbError } = await supabase
          .from('image_assets')
          .insert({
            file_path: storedFilePath,
            original_name: file.name,
            mime_type: file.type,
            size: file.size
          })
          .select()
          .single();

        if (dbError) throw new Error(`Database insertion failed: ${dbError.message}`);

        // 4. Return success response
        return {
          name: file.name,
          success: true,
          message: undefined,
          path: storedFilePath,
          url: urlData.signedUrl,
          id: imageRecord.id
        }
        } catch (error:any) {
          return {
          name: file.name,
          success: false,
          message: error.message,
          path: error.path,
          url: error.url
        };
          
        }
      })
    )

    const responseErrors = responses.filter((x) => x.message !== undefined)
    // if there were errors previously, this function tried to upload the files again so we should clear/overwrite the existing errors.
    //setErrors(responseErrors.map(x => ({ name: x.name, message: x.message })));
    setErrors(responseErrors)


    const responseSuccesses = responses.filter((x) => x.message === undefined)
    const newSuccesses = Array.from(
      new Set([...successes, ...responseSuccesses.map((x) => x.name)])
    )
    setSuccesses(newSuccesses)

    // setting the url of the image to state
    const urlResponses = responses.filter((x) => x.url !== undefined)
    setFileUrls(urlResponses.map(response => ({
      name: response.name,
      signUrl: response.url!,
      idUrl: response.id!
    })))


    setLoading(false)
  }, [files, path, bucketName, errors, successes])

  useEffect(() => {
    if (files.length === 0) {
      setErrors([])
    }

    // If the number of files doesn't exceed the maxFiles parameter, remove the error 'Too many files' from each file
    if (files.length <= maxFiles) {
      let changed = false
      const newFiles = files.map((file) => {
        if (file.errors.some((e) => e.code === 'too-many-files')) {
          file.errors = file.errors.filter((e) => e.code !== 'too-many-files')
          changed = true
        }
        return file
      })
      if (changed) {
        setFiles(newFiles)
      }
    }
  }, [files.length, setFiles, maxFiles])

  return {
    fileUrls,
    files,
    setFiles,
    successes,
    isSuccess,
    loading,
    errors,
    setErrors,
    onUpload,
    maxFileSize: maxFileSize,
    maxFiles: maxFiles,
    allowedMimeTypes,
    ...dropzoneProps,
  }
}

export { useSupabaseUpload, type UseSupabaseUploadOptions, type UseSupabaseUploadReturn }
