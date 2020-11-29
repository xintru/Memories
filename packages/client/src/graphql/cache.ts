import { InMemoryCache, makeVar } from '@apollo/client'
import StorageService, { StorageTypes } from '../services/storage'

const storage = StorageService.Instance

export const isLoggedIn = makeVar(
  !!storage.get(StorageTypes.LOCAL_STORAGE, 'memories_token'),
)

export const initCache = () => {
  return new InMemoryCache()
}
