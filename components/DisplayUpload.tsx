'use client'
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client'
import UploadCard from './UploadCard';
import { isString } from 'util';

interface DisplayUploadProps {
  
}

const supabase = createClient();


const DisplayUpload: React.FC<DisplayUploadProps> = ({  }) => {

  const [dataList, setDataList] = useState<any>([])
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.storage.from('upload-image').list('images', {limit: 10, offset: 0, sortBy: { column: 'name', order: 'asc' } })
      if (error) {
        setError(error.message);
      } else {
        setDataList(data || []);
      }
    };

  }, [])

  return (
    <div>
      {error && <div>Error: {error}</div>}
      {dataList.length > 0 ? (
        <div>
          {/* {dataList.map((item, index) => ( */}
          {/*   <UploadCard key={index} item={item} /> */}
          {/* ))} */}
          There are some images
        </div>
      ) : (
        <div>No uploads found.</div>
      )}
    </div>
  );
};


export default DisplayUpload;
