import { User } from 'graphql/user/user.interfaces'

export interface Comment {
  created: any
  id: string
  memory: Memory
  message: string
  user: User
}

export interface Memory {
  comments: Comment[]
  created: any
  description: string
  id: string
  name: string
  user: User[]
}
