import React,{useEffect, useState} from 'react'
import ReactS3Client from 'react-aws-s3-typescript';
import {s3Config} from '../s3Config';


const Shared = () => {
  const [fileList, setfileList] = useState<any[]>([])

  useEffect(() => {
    const listFiles = async () => {
      /* Import s3 config object and call the constrcutor */
      const s3 = new ReactS3Client(s3Config);

      try {
          const rest = await s3.listFiles();
          setfileList(rest.data.Contents.filter((file: any) => file.Key.startsWith('sharedspace/')))
          /*
          * {
          *   Response: {
          *     message: "Objects listed succesfully",
          *     data: {                   // List of Objects
          *       ...                     // Meta data
          *       Contents: []            // Array of objects in the bucket
          *     }
          *   }
          * }
          */
      } catch (exception) {
          console.log(exception);
          /* handle the exception */
      }
  }
  listFiles();
  console.log(fileList);
  }, [])
  
  return (
    // A file library to display all the files pulled from s3 bucket, it has key being file name and publicUrl the link to the file
    //the library uses tailwindcss
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl font-bold">Shared</div>
      <div className="text-2xl font-bold">Files:</div>
      <div className="flex flex-col items-center justify-center">
      {fileList.map((file) => (
        <div key={file.Key} className="flex flex-ocl items-center justify-center underline">
          <div className="text-xl font-bold">
            <a href={file.publicUrl}>
              {file?.Key.replace('sharedspace/', '')}
            </a>
          </div>
        </div>
      ))}
      </div>
    </div>
    

  )
}

export default Shared