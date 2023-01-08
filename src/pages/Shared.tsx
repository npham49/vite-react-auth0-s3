import { SetStateAction, useEffect, useState } from "react";
import AWS from "aws-sdk";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

AWS.config.update({
  accessKeyId: import.meta.env.VITE_AWS_ACCESS_KEY_ID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRET_KEY,
  region: import.meta.env.VITE_S3_BUCKET_REGION,
});

const s3 = new AWS.S3();

const params = {
  Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
  Delimiter: "",
  Prefix: "sharedspace/",
};

const Shared = () => {
  const [fileList, setfileList] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState(null);

  const { getAccessTokenSilently } = useAuth0();

  //Get a temporary access key for 60 seconds
  const getUrl = (key: string) => {
    const url = s3.getSignedUrl("getObject", {
      Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
      Key: key,
      Expires: 60,
    });
    return url;
  };

  useEffect(() => {
    // s3.getObject({
    //   Bucket: import.meta.env.VITE_S3_BUCKET_NAME,
    //   Key: 'sharedspace/text.txt',
    // }, (err, data) => {
    //   if (err) {
    //     console.log(err, err.stack);
    //   } else {
    //     console.log(data);
    //   }
    // });

    const getAccessToken = async () => {
      try {
        const token = await getAccessTokenSilently({
          audience: `${import.meta.env.VITE_API_URL}/getfiles`,
          scope: "read:getfiles",
        });
        setAccessToken(token);
        console.log(token);
      } catch (e: any) {
        console.log(e.message);
      }
    };
    getAccessToken();
    // console.log(fileList);
  }, []);

  useEffect(() => {
    console.log("there is a token");
    if (accessToken) {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          folder: "sharedspace",
        },
      };
      axios
        .get(`${import.meta.env.VITE_API_URL}/files`, config)
        .then((res) => {
          console.log("this is from the API");
          console.log(res);
          if (res.status === 200) {
            setfileList(res.data.Contents);
          } else {
            console.log("error");
          }

        })
        .catch(console.log);
    }
  }, [accessToken]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const data = new FormData();
    data.append("file", selectedFile!);
    const fileconfig = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        folder: "sharedspace",
      },
    };

    axios
      .post(`${import.meta.env.VITE_API_URL}/files`, data, fileconfig)
      .then((res) => {
        console.log("this is from the API");
        console.log(res);
        if (res.status === 200) {
          window.location.reload();
        } else {
          console.log("error");
        }
      })
      .catch(console.log);
  };

  const handleFileSelect = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  return (
    // A file library to display all the files pulled from s3 bucket, it has key being file name and publicUrl the link to the file
    //the library uses tailwindcss
    <div className="flex flex-col items-center justify-center">
      <div className="text-5xl font-bold">Shared</div>
      {/* upload button */}
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileSelect} />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Upload
        </button>
      </form>

      <div className="text-2xl font-bold">Files:</div>
      <div className="flex flex-col items-center justify-center">
        {fileList.map((file) => (
          <div
            key={file.Key}
            className="flex flex-ocl items-center justify-center underline"
          >
            <div className="text-xl font-bold">
              <a href={getUrl(file.Key)}>
                {file?.Key.replace("sharedspace/", "")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Shared;
