'use client'

import { Button } from '@nextui-org/button'
import { User } from 'next-auth'
import { SelectUser } from '../_components'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { encodeAndStringifyObject } from '@/libs'

async function getUser(): Promise<User[]> {
  const res = await fetch('/api/users', { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const { users } = await res.json()

  return users
}

export default function MatchRegisterPlayerPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])

  const [playerOne, setPlayerOne] = useState(new Set([]))
  const [playerTwo, setPlayerTwo] = useState(new Set([]))

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getUser()
      } catch (error) {
        console.error(error)
      }
    }

    fetchData().then((r) => setUsers(r))
  }, [])

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
