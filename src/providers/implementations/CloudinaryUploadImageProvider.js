"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CloudinaryProvider = void 0;
const stream_1 = require("stream");
const cloudinary_1 = require("cloudinary");
const IErrorRepository_1 = require("../../repositories/IErrorRepository");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});
class CloudinaryProvider {
    async uploadStream(fileBuffer, publicId) {
        return new Promise((resolve, reject) => {
            const uploadStream = cloudinary_1.v2.uploader.upload_stream({
                // folder: "studies_thumbnails",
                public_id: publicId,
                overwrite: !!publicId,
                transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
            }, (error, result) => {
                if (error)
                    return reject(new IErrorRepository_1.BadRequest("Erro de envio Cloudinary: " + error));
                if (!result)
                    return reject(new IErrorRepository_1.BadRequest("Erro ao fazer upload da imagem"));
                resolve({ url: result.secure_url, id: result.public_id });
            });
            stream_1.Readable.from(fileBuffer).pipe(uploadStream);
        });
    }
    async destroy(id) {
        await cloudinary_1.v2.uploader.destroy(id, (error, result) => {
            if (error)
                throw new IErrorRepository_1.BadRequest("Erro ao deletar imagem: " + error);
            if (result.result !== "ok") {
                throw new IErrorRepository_1.BadRequest("Não foi possível deletar imagem:" + result);
            }
        });
    }
}
exports.CloudinaryProvider = CloudinaryProvider;
