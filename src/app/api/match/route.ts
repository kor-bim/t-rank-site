import { NextResponse } from 'next/server'
import { db } from '@/libs'

export const revalidate = 0
function calculate_new_rankings(P1_before, P2_before, I, W1) {
  const dr = P1_before - P2_before
  const We1 = 1 / (10 ** (-dr / 600) + 1)
  const We2 = 1 / (10 ** (dr / 600) + 1)
  const P1_after = Math.max(0, P1_before + I * (W1 - We1))
  const P2_after = Math.max(0, P2_before + I * (1 - W1 - We2))
  return [P1_after, P2_after]
}

export async function POST(request: Request) {
  const data = await request.json()

  const { player, game } = data

  const defaultRank = 0

  const p1_current = (await db.ranking.findUnique({ where: { userId: player.p1.id } })) || { points: defaultRank }
  const p2_current = (await db.ranking.findUnique({ where: { userId: player.p2.id } })) || { points: defaultRank }

  let W1

  if (game.playerOne.shootout === 'win') {
    W1 = 0.75
  } else if (game.playerOne.shootout === 'defeat') {
    W1 = 0.25
  } else {
    switch (game.playerOne.result) {
      case 'win':
        W1 = 1
        break
      case 'defeat':
        W1 = 0
        break
      default: // 무승부나 기타 상황
        W1 = 0.5
    }
  }

  const [p1_new_ranking, p2_new_ranking] = calculate_new_rankings(
    p1_current.points,
    p2_current.points,
    parseInt(game.important),
    W1
  )

  await db.ranking.upsert({
    where: { userId: player.p1.id },
    create: { userId: player.p1.id, points: p1_new_ranking },
    update: { points: p1_new_ranking }
  })

  await db.ranking.upsert({
    where: { userId: player.p2.id },
    create: { userId: player.p2.id, points: p2_new_ranking },
    update: { points: p2_new_ranking }
  })

  await db.match.create({
    data: {
      userId1: player.p1.id,
      userId2: player.p2.id,
      important: parseInt(game.important),
      result1: game.playerOne.result,
      result2: game.playerTwo.result,
      score1: parseInt(game.playerOne.score),
      score2: parseInt(game.playerTwo.score),
      shootout1: game.playerOne.shootout,
      shootout2: game.playerTwo.shootout
    }
  })

  return NextResponse.json({
    p1_new_ranking,
    p2_new_ranking
  })
}
