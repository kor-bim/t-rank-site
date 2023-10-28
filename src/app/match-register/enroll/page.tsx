'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardBody, CardHeader } from '@nextui-org/card'
import { decodeAndParseData } from '@/libs'
import { Avatar } from '@nextui-org/avatar'
import React from 'react'
import { Button } from '@nextui-org/button'

async function createMatch(player: any, game: any) {
  const res = await fetch('/api/match', {
    method: 'POST',
    body: JSON.stringify({ player, game })
  })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }

  const { ranking } = await res.json()

  return ranking
}

export default function MatchRegisterEnrollPage() {
  const searchParams = useSearchParams()
  const playerDataString = searchParams.get('p')
  const gameDataString = searchParams.get('d')
  const router = useRouter()

  const { playerData, gameData } = decodeAndParseData(playerDataString, gameDataString)

  const p1Ui = {
    result: gameData.playerOne.result === 'win' ? '승리' : gameData.playerOne.result === 'defeat' ? '패배' : '무승부',
    color:
      gameData.playerOne.result === 'win' ? 'primary' : gameData.playerOne.result === 'defeat' ? 'danger' : 'default'
  }

  const p2Ui = {
    result: gameData.playerTwo.result === 'win' ? '승리' : gameData.playerTwo.result === 'defeat' ? '패배' : '무승부',
    color:
      gameData.playerTwo.result === 'win' ? 'primary' : gameData.playerTwo.result === 'defeat' ? 'danger' : 'default'
  }

  const enrollHandler = () => {
    createMatch(playerData, gameData).then(() => router.push('/'))
  }

  return (
    <div className="w-full h-[80dvh] max-w-xl flex flex-col items-center justify-center gap-14">
      <div className="w-full grid grid-cols-2 grid-rows-1 gap-4">
        <div className="flex flex-col items-center justify-center gap-5">
          <Card fullWidth className={`bg-${p1Ui.color}`}>
            <CardHeader className="w-full flex items-center justify-start gap-3">
              <Avatar
                alt={playerData.p1.name ?? ''}
                className="flex-shrink-0"
                size="lg"
                src={playerData.p1.image ?? ''}
              />
              <span>{playerData.p1.name}</span>
            </CardHeader>
            <CardBody className="w-full flex flex-col items-start justify-center gap-2">
              <span className="text-2xl font-bold">{p1Ui.result}</span>
              <div className="w-full flex items-center justify-start gap-2">
                <span className="text-xl">스코어</span>
                <span className="text-xl">{gameData.playerOne.score}</span>
              </div>
            </CardBody>
          </Card>
        </div>
        <div className="flex flex-col items-center justify-start gap-5">
          <Card fullWidth className={`bg-${p2Ui.color}`}>
            <CardHeader className="w-full flex items-center justify-start gap-3">
              <Avatar
                alt={playerData.p2.name ?? ''}
                className="flex-shrink-0"
                size="lg"
                src={playerData.p2.image ?? ''}
              />
              <span>{playerData.p2.name}</span>
            </CardHeader>
            <CardBody className="w-full flex flex-col items-start justify-center gap-2">
              <span className="text-2xl font-bold">{p2Ui.result}</span>
              <div className="w-full flex items-center justify-start gap-2">
                <span className="text-xl">스코어</span>
                <span className="text-xl">{gameData.playerTwo.score}</span>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
      <Button fullWidth color="success" variant="bordered" onPress={enrollHandler}>
        등록
      </Button>
    </div>
  )
}
