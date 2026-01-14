import { Readable } from "stream";
import { v2 as cloudinary } from "cloudinary";
import { BadRequest } from "../../repositories/IErrorRepository";
import { IUploadFile, UploadResourceType } from "../IUploadFile";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export class CloudinaryProvider implements IUploadFile {
  async uploadStream(
    fileBuffer: Buffer,
    options: {
      resourceType: UploadResourceType;
      publicId?: string;
      folder?: string;
    }
  ): Promise<{ url: string; id: string }> {
    const { resourceType, publicId, folder } = options;

    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          resource_type: resourceType,
          public_id: publicId,
          folder,
          overwrite: !!publicId,
          transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
        },
        (error, result) => {
          if (error) {
            return reject(
              new BadRequest("Erro de envio Cloudinary: " + error.message)
            );
          }

          if (!result) {
            return reject(new BadRequest("Erro ao fazer upload do arquivo"));
          }

          resolve({
            url: result.secure_url,
            id: result.public_id,
          });
        }
      );

      Readable.from(fileBuffer).pipe(uploadStream);
    });
  }

  async destroy(publicId: string, resourceType: "image" | "video") {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
      invalidate: true,
    });

    // if (result.result === "not found") {
    //   // log opcional
    //   console.warn(`[Cloudinary] Arquivo não encontrado: ${publicId}`);
    //   return;
    // }

    if (result.result !== "ok") {
      throw new BadRequest(
        "Erro ao deletar arquivo no Cloudinary: " + JSON.stringify(result)
      );
    }
  }
}
