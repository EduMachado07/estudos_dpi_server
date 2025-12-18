export interface IUploadImage {
  uploadStream(fileBuffer: Buffer, publicId?: string): Promise<{url: string, id: string}>;
  destroy(id: string): Promise<void>;
}