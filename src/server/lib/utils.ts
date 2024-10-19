import 'server-only';

import cloudinary from '@/config/cloudinary';

export async function uploadFile(
  file: File,
  public_id?: string,
  folder?: string,
) {
  try {
    const mimeType = file.type;
    const imageData = await file.arrayBuffer();
    const base64Image = Buffer.from(imageData).toString('base64');

    const uploadImage = await cloudinary.uploader.upload(
      `data:${mimeType};base64,${base64Image}`,
      {
        public_id: public_id,
        folder: folder,
      },
    );
    return uploadImage.secure_url;
  } catch (error) {
    console.log('error uploading to cloudinary', error);
  }
}
