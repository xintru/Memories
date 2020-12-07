import { InMemoryCache, makeVar } from '@apollo/client'
import StorageService, { StorageTypes } from '../services/storage'

const storage = StorageService.Instance

export const isLoggedIn = makeVar<boolean>(
  !!storage.get(StorageTypes.LOCAL_STORAGE, 'memories_token'),
)
export const lastUploadedImageUrl = makeVar<string[]>([])

export const cache = new InMemoryCache()
