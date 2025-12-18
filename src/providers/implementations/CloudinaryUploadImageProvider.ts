import { Readable } from "stream";
import { v2 as cloudinary, UploadApiErrorResponse } from "cloudinary";
import { BadRequest } from "../../repositories/IErrorRepository";
import { IUploadImage } from "../IUploadImage";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export class CloudinaryProvider implements IUploadImage {
  async uploadStream(
    fileBuffer: Buffer,
    publicId?: string
  ): Promise<{ url: string; id: string }> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          // folder: "studies_thumbnails",
          public_id: publicId,
          overwrite: !!publicId,
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        },
        (error, result) => {
          if (error)
            return reject(new BadRequest("Erro de envio Cloudinary: " + error));
          if (!result)
            return reject(new BadRequest("Erro ao fazer upload da imagem"));
          resolve({ url: result.secure_url, id: result.public_id });
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  }
  async destroy(id: string): Promise<void> {
    await cloudinary.uploader.destroy(id, (error, result) => {
      if (error) throw new BadRequest("Erro ao deletar imagem: " + error);
      if (result.result !== "ok") {
        throw new BadRequest("Não foi possível deletar imagem:" + result);
      }
    });
  }
}
