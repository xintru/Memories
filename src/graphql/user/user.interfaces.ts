import { Comment, Memory } from 'graphql/memories/memories.interfaces'

export interface TokenData {
  expiresAt: number
  token: string
}

export interface User {
  avatar_url: string
  comments: Comment[]
  email: string
  id: string
  memories: Memory[]
  name: string
}

export interface AuthReturnData {
  tokenData: TokenData
  user: User
}
