import { v2 as cloudinary } from 'cloudinary';



// Upload an image
const uploadfile = async (files) => {
  const uploadedResult = [];
  for (const file of files) {
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "uploadfile" }, (error, data) => {
          if (error) return reject(error)
          resolve(data);
        }).end(file.buffer)
    })
    uploadedResult.push(result);

  }

  return uploadedResult;

}
export default uploadfile;

