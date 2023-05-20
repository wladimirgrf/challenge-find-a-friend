import { Readable } from 'node:stream'

export interface UploadInput {
  filename: string
  file: Readable
}

interface UploadOutput {
  fileUrl: string
}

export interface StorageProvider {
  upload(data: UploadInput): Promise<UploadOutput>
}
