'use client'

import { Button } from '@nextui-org/button'
import NextLink from 'next/link'
import { Ranking } from '@/app/type'
import { Card, CardBody } from '@nextui-org/card'
import { round } from 'lodash'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

async function getRanking(): Promise<Ranking[]> {
  const res = await fetch('https://rk.hanbin.dev/api/ranking', { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  const { ranking } = await res.json()

  return ranking
}
export default function MainPage() {
  const [rankings, setRankings] = useState<Ranking[]>([])
  const { data: session, status } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      try {
        return await getRanking()
      } catch (error) {
        console.error(error)
      }
    }

    fetchData().then((r) => setRankings(r))
  }, [])

  return (
    <div className="w-full max-w-5xl flex flex-col items-center justify-center gap-16">
      {status === 'authenticated' ? (
        <Button fullWidth size="lg" color="success" variant="bordered" as={NextLink} href="/match-register/player">
          게임등록
        </Button>
      ) : null}

      <div className="w-full flex flex-col items-center justify-center gap-2">
        {rankings.map((ranking, index) => (
          <Card
            isHoverable
            isPressable
            fullWidth
            key={index}
            className={
              index === 0 ? 'bg-blue-800' : ranking.user.email === session?.user.email ? 'bg-secondary-200' : null
            }
          >
            <CardBody className="w-full flex flex-col md:flex-row items-start md:items-center justify-start gap-10">
              <div className="w-full flex flex-row items-center justify-between md:justify-start gap-16">
                <span className="text-7xl font-bold mx-10">{index + 1}</span>
                <div className="flex flex-col md:flex-row items-start md:items-center justify-center gap-5">
                  <Image src={ranking.user.image} alt={`${ranking.user.name}-image`} />
                  <div className="max-w-[200px] flex flex-col items-start justify-center gap-5">
                    <span className="text-3xl font-bold">{ranking.user.name}</span>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-row items-center justify-between md:justify-start gap-16">
                <div className="flex flex-col items-start justify-center gap-5">
                  <span className="text-3xl font-bold">최근 경기결과</span>
                  <div className="flex flex-row items-center justify-start gap-2">
                    {ranking.user.matches.map((result, index) => (
                      <Chip
                        key={`chip-${index}`}
                        color={result === 'win' ? 'primary' : result === 'defeat' ? 'danger' : 'default'}
                      >
                        {result === 'win' ? '승리' : result === 'defeat' ? '패배' : '무승부'}
                      </Chip>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col items-end justify-center">
                  <span className="text-2xl font-bold">{round(ranking.points, 2)} Pt</span>
                </div>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  )
}
