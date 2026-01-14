export type UploadResourceType = "image" | "video";

export interface IUploadFile {
  uploadStream(
    fileBuffer: Buffer,
    options: {
      resourceType: UploadResourceType;
      publicId?: string;
      folder?: string;
    }
  ): Promise<{ url: string; id: string }>;

  destroy(
    id: string,
    resourceType: UploadResourceType
  ): Promise<void>;
}
