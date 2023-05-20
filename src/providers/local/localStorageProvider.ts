import { resolve } from 'node:path'
import { createWriteStream } from 'node:fs'
import { pipeline } from 'node:stream'
import { promisify } from 'node:util'

import { StorageProvider, UploadInput } from '../storageProvider'

const pump = promisify(pipeline)

export class LocalStorageProvider implements StorageProvider {
  async upload({ file, filename }: UploadInput) {
    const writeStream = createWriteStream(
      resolve(__dirname, '../../../assets', filename),
    )

    await pump(file, writeStream)
  }
}
