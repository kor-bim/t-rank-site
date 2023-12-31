'use client'

import { Button } from '@nextui-org/button'
import NextLink from 'next/link'
import { Card, CardBody } from '@nextui-org/card'
import { round } from 'lodash'
import { Image } from '@nextui-org/image'
import { Chip } from '@nextui-org/chip'
import { useSession } from 'next-auth/react'
import { useQuery } from '@tanstack/react-query'
import { fetchRankingList } from '@/app/api/ranking/hooks'

export default function MainPage() {
  const { data: session, status } = useSession()

  const {
    isError,
    isLoading,
    data: rankings
  } = useQuery({
    queryKey: ['rankings'],
    queryFn: fetchRankingList
  })

  if (isError) return null
  if (isLoading) return null

  return (
    <div className="relative w-full max-w-5xl flex flex-col items-center justify-center gap-16">
      {status === 'authenticated' ? (
        <Button fullWidth size="lg" color="success" variant="bordered" as={NextLink} href="/match-register/player">
          게임등록
        </Button>
      ) : null}
      <div className="w-full flex flex-col items-center justify-center">
        <span className="text-5xl font-bold">
          <span className="text-primary">승리</span>를 원하는가?
        </span>
        <Image isBlurred src="/2.png" alt="trophy" />
      </div>
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
                  <Image
                    width={110}
                    className="h-[110px]"
                    src={ranking.user.image}
                    alt={`${ranking.user.name}-image`}
                  />
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
      <div className="w-full flex flex-col items-center justify-center gap-5">
        <div className="w-full flex flex-col md:flex-row items-center justify-center gap-1">
          <span className="text-5xl font-bold text-danger">야수의 눈으로</span>
          <span className="text-5xl font-bold">
            <span className="text-primary">승리</span>를 쟁취하라
          </span>
        </div>
        <Image isBlurred src="/beast-eye.png" alt="야수의눈으로 승리를 쟁취하라" />
      </div>

      <Image isBlurred src="/1.png" alt="1" />
    </div>
  )
}
