'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import UploadCard  from './UploadCard';

interface DisplayUploadProps {
  
}

type imageListProps = {
  name: string,
  id: string,
  url: {
    signedUrl: string
  }
}

const supabase = createClient();


const DisplayUpload: React.FC<DisplayUploadProps> = ({  }) => {

  const [dataList, setDataList] = useState<any>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data: files, error } = await supabase
        .storage.from('upload-image')
        .list('images')
      if (error) {
        setError(error.message);
        return
      }
      // else {
      //   setDataList(data || []);
      // }
      // 2. setting up the signUrl for the image
      const itemsWithUrl = await Promise.all(
        (files || []).map(async file => {
          const path = `images/${file.name}`

          const {data: signUrl, error: urlError} = await supabase
            .storage
            .from('upload-image')
            .createSignedUrl(path, 60 * 60 )

          if(urlError) {
            setError(urlError.message);
            return null
          }
           return {
          ...file,
            url: signUrl ?? '',      // you can also call this `imageUrl`
        }

        })
      )
      setDataList(itemsWithUrl || [])
    };

    fetchData();
  }, [])

  console.log(dataList)

  return (
    

    <div>
      {error && <div>Error: {error}</div>}
      {dataList.length > 0 ? (
        <div>
          {dataList.slice(1).map((item: imageListProps , index:number) => (
            <li className='list-none' key={index}>
            <UploadCard  url={item.url.signedUrl} imageUrl={`https://localhost:3000/image/${item.id}`} name={item.name} />
            </li>
          ))}
        </div>
      ) : (
        <div>No uploads found.</div>
      )}
    </div>
  );
};


export default DisplayUpload;
