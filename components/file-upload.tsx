'use client'
import { Dropzone, DropzoneContent, DropzoneEmptyState } from '@/components/dropzone'
import { useSupabaseUpload } from '@/hooks/use-supabase-upload'
import UploadCard from './UploadCard'

const FileUpload = () => {
  const props = useSupabaseUpload({
    bucketName: 'upload-image',
    path: 'images',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })


  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      <div>
        <div className='my-6 w-full '>
        </div>
        {props.isSuccess && (
          <div className='my-6 w-full'>
            <h2>Uploaded File URLs:</h2>
            <ul>
              {props.fileUrls && props.fileUrls.map((fileUrl) => (
                <li key={fileUrl.name}>
                  <UploadCard url={fileUrl.signUrl} name={fileUrl.name} imageUrl={`http://localhost:3000/img/${fileUrl.idUrl}`} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export { FileUpload }
