export type Match = {
  id: string
  userId1: string
  userId2: string
  important: number
  result1: string
  result2: string
  score1: number
  score2: number
  shootout1: string | null
  shootout2: string | null
}

export type User = {
  id: string
  name: string | null
  email: string | null
  emailVerified: Date | null
  image: string | null
  matches1: Match[]
  matches2: Match[]
}

export type Ranking = {
  id: string
  userId: string
  points: number
  user: User & { matches: string[] }
}

export type RankingResponseData = {
  ranking: Ranking[]
}
