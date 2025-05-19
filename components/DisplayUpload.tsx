'use client'
import React, { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import UploadCard from './UploadCard'

interface DisplayUploadProps {}

type FileItem = {
  name: string
  path: string           // e.g. "images/foo.png"
  signedUrl: string
  dbId: string | null    // the id from your image_assets table
}

const supabase = createClient()

const DisplayUpload: React.FC<DisplayUploadProps> = () => {
  const [items, setItems] = useState<FileItem[]>([])
  const [error, setError] = useState<string | null>(null)
  const [origin, setOrigin] = useState('')

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }

    async function fetchData() {
      // 1) list files in storage
      const { data: files, error: listError } = await supabase
        .storage
        .from('upload-image')
        .list('images')

      if (listError) {
        setError(listError.message)
        return
      }
      if (!files) {
        setItems([])
        return
      }

      // 2) generate signed URLs and build paths array
      const withUrls: FileItem[] = await Promise.all(
        files.map(async (file) => {
          const path = `images/${file.name}`
          const { data: urlData, error: urlError } = await supabase
            .storage
            .from('upload-image')
            .createSignedUrl(path, 60 * 60)

          if (urlError) {
            throw urlError
          }

          return {
            name: file.name,
            path,
            signedUrl: urlData.signedUrl,
            dbId: null,
          }
        })
      )

      // 3) batch-fetch IDs from your Postgres table
      const paths = withUrls.map((f) => f.path)
      const { data: dbEntries, error: dbError } = await supabase
        .from('image_assets')
        .select('id, file_path')
        .in('file_path', paths)

      if (dbError) {
        setError(dbError.message)
        return
      }

      // 4) merge the DB ids back into your list
      const idMap = new Map<string, string>()
      dbEntries?.forEach((row) => {
        idMap.set(row.file_path, row.id)
      })

      const merged = withUrls.map((f) => ({
        ...f,
        dbId: idMap.get(f.path) ?? null
      }))

      setItems(merged)
    }

    fetchData().catch((err) => {
      console.error(err)
      setError(err.message || 'Unknown error')
    })
  }, [])

  if (error) return <div className="text-red-600">Error: {error}</div>

  return (
    <div>
      {items.length > 0 ? (
        <ul className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {items.slice(1).map((item) => (
            <li key={item.path} className="list-none">
              <UploadCard
                url={item.signedUrl}
                imageUrl={`${origin}/img/${item.dbId}`}
                name={item.name}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div>No uploads found.</div>
      )}
    </div>
  )
}

export default DisplayUpload
