'use client'

import { Button } from '@nextui-org/button'
import { SelectUser } from '../_components'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import { encodeAndStringifyObject } from '@/libs'
import { useQuery } from '@tanstack/react-query'
import { fetchUserList } from '@/app/api/users/hooks'

export default function MatchRegisterPlayerPage() {
  const router = useRouter()

  const [playerOne, setPlayerOne] = useState(new Set([]))
  const [playerTwo, setPlayerTwo] = useState(new Set([]))

  const {
    isError,
    isLoading,
    data: users
  } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUserList
  })

  if (isError) return null
  if (isLoading) return null

  const onNextHandler = () => {
    if (playerOne.size === 0 || playerTwo.size === 0) {
      toast.error('플레이어를 선택해주세요.')
      return
    }

    const playerOneId = Array.from(playerOne)[0]
    const playerTwoId = Array.from(playerTwo)[0]

    const playerOneInfo = users.find((user) => user.id === playerOneId)
    const playerTwoInfo = users.find((user) => user.id === playerTwoId)

    const playersObject = {
      p1: playerOneInfo,
      p2: playerTwoInfo
    }

    const encodedString = encodeAndStringifyObject(playersObject)
    router.push(`/match-register/result?p=${encodedString}`)
  }

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center gap-14">
      <span className="text-3xl font-bold">플레이어 선택</span>
      <div className="w-full flex items-center justify-center gap-5">
        <SelectUser data={users} label={'team1'} state={playerOne} setState={setPlayerOne} />
        <span className="text-2xl">VS</span>
        <SelectUser data={users} label={'team2'} state={playerTwo} setState={setPlayerTwo} />
      </div>
      <Button fullWidth size="lg" variant="bordered" color="success" onPress={onNextHandler}>
        다음
      </Button>
    </div>
  )
}
