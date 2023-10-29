import { User } from 'next-auth'
import axios from 'axios'

export async function fetchUserList(): Promise<User[]> {
  try {
    const response = await axios.get<User[]>('/api/users')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
