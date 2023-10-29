import { Ranking } from '@/app/type'
import axios from 'axios'

export async function fetchRankingList(): Promise<Ranking[]> {
  try {
    const response = await axios.get<Ranking[]>('/api/ranking')
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}
