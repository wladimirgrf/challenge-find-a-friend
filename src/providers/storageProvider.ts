import { Readable } from 'node:stream'

export interface UploadInput {
  filename: string
  file: Readable
}

export interface StorageProvider {
  upload(data: UploadInput): Promise<void>
}
