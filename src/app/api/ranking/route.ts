import { NextResponse } from 'next/server'
import Prisma from '@prisma/client'

export const prisma = new Prisma.PrismaClient()

export async function GET() {
  const ranking = await prisma.ranking.findMany({
    include: {
      user: true
    },
    orderBy: {
      points: 'desc'
    }
  })

  // 최근 3 경기 결과만 포함시킨 후 반환
  const processedRanking = await Promise.all(
    ranking.map(async (rankingData) => {
      const userId = rankingData.userId
      const allMatches1 = await prisma.match.findMany({
        where: { userId1: userId },
        orderBy: { id: 'desc' },
        take: 3
      })
      const allMatches2 = await prisma.match.findMany({
        where: { userId2: userId },
        orderBy: { id: 'desc' },
        take: 3
      })
      const allMatches = [...allMatches1, ...allMatches2]
      const sortedMatches = allMatches.sort((a, b) => b.id.localeCompare(a.id)).slice(0, 3)
      const resultMatches = sortedMatches.map((match) => (match.userId1 === userId ? match.result1 : match.result2))

      return {
        ...rankingData,
        user: {
          ...rankingData.user,
          matches1: allMatches1,
          matches2: allMatches2,
          matches: resultMatches
        }
      }
    })
  )

  return NextResponse.json({ ranking: processedRanking })
}
