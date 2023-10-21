'use client'
import { Input } from '@nextui-org/input'
import { Radio, RadioGroup } from '@nextui-org/radio'
import { cn } from '@nextui-org/system-rsc'
import { Button } from '@nextui-org/button'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { encodeAndStringifyObject } from '@/libs'

export default function MatchRegisterResultPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [importantValue, setImportantValue] = useState('10')
  const [playerOneScore, setPlayerOneScore] = useState('0')
  const [playerTwoScore, setPlayerTwoScore] = useState('0')
  const [shootOutSelectedOne, setShootOutSelectedOne] = useState('')
  const [shootOutSelectedTwo, setShootOutSelectedTwo] = useState('')

  useEffect(() => {
    setShootOutSelectedOne('')
    setShootOutSelectedTwo('')
  }, [playerOneScore, playerTwoScore])

  const onShootOutSelectedOneChange = (value: string) => {
    setShootOutSelectedOne(value)
    setShootOutSelectedTwo(value === 'shootout_win' ? 'shootout_defeat' : 'shootout_win')
  }

  const onShootOutSelectedTwoChange = (value: string) => {
    setShootOutSelectedTwo(value)
    setShootOutSelectedOne(value === 'shootout_win' ? 'shootout_defeat' : 'shootout_win')
  }

  const onResetHandler = () => {
    setImportantValue('10')
    setPlayerOneScore('0')
    setPlayerTwoScore('0')
    setShootOutSelectedOne('')
    setShootOutSelectedTwo('')
  }

  const onNextHandler = () => {
    const resultObject = {
      important: importantValue,
      playerOne: {
        result:
          playerOneScore > playerTwoScore || shootOutSelectedOne === 'shootout_win'
            ? 'win'
            : playerOneScore < playerTwoScore || shootOutSelectedOne === 'shootout_defeat'
            ? 'defeat'
            : 'draw',
        score: playerOneScore,
        shootout: shootOutSelectedOne
      },
      playerTwo: {
        result:
          playerTwoScore > playerOneScore || shootOutSelectedTwo === 'shootout_win'
            ? 'win'
            : playerTwoScore < playerOneScore || shootOutSelectedTwo === 'shootout_defeat'
            ? 'defeat'
            : 'draw',
        score: playerTwoScore,
        shootout: shootOutSelectedTwo
      }
    }

    const encodedString = encodeAndStringifyObject(resultObject)
    router.push(`/match-register/enroll?p=${searchParams.get('p')}&d=${encodedString}`)
  }

  return (
    <div className="w-full max-w-xl flex flex-col items-center justify-center gap-14">
      <span className="text-3xl font-bold">경기결과 선택</span>
      <div className="w-full flex items-center justify-end">
        <Button size="sm" variant="bordered" color="danger" onClick={onResetHandler}>
          초기화
        </Button>
      </div>
      <Input
        type="number"
        size="lg"
        color="secondary"
        label="경기 중요도"
        labelPlacement="outside"
        placeholder="경기중요도를 입력해주세요."
        value={importantValue}
        onValueChange={setImportantValue}
        min="0"
      />
      <div className="w-full grid grid-cols-2 grid-rows-1 gap-4">
        <div className="flex flex-col items-center justify-center gap-5">
          <Input
            fullWidth
            type="number"
            defaultValue="0"
            variant="bordered"
            min="0"
            value={playerOneScore}
            onValueChange={setPlayerOneScore}
            classNames={{ inputWrapper: 'h-[200px]', input: 'text-center text-7xl' }}
          />
          {playerOneScore === playerTwoScore && (
            <RadioGroup
              className="w-full"
              label="팀1 승부차기 경기결과"
              value={shootOutSelectedOne}
              onValueChange={(value) => onShootOutSelectedOneChange(value)}
            >
              <Radio
                description="팀1 승부차기 승리"
                value="shootout_win"
                color="primary"
                classNames={{
                  base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary'
                  )
                }}
              >
                승부차기 승리
              </Radio>
              <Radio
                description="팀1 승부차기 패배"
                value="shootout_defeat"
                color="danger"
                classNames={{
                  base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-danger'
                  )
                }}
              >
                승부차기 패배
              </Radio>
            </RadioGroup>
          )}
        </div>
        <div className="w-full flex flex-col items-center justify-center gap-5">
          <Input
            fullWidth
            type="number"
            defaultValue="0"
            variant="bordered"
            min="0"
            value={playerTwoScore}
            onValueChange={setPlayerTwoScore}
            classNames={{ inputWrapper: 'h-[200px]', input: 'text-center text-7xl' }}
          />
          {playerOneScore === playerTwoScore && (
            <RadioGroup
              className="w-full"
              label="팀2 승부차기 경기결과"
              value={shootOutSelectedTwo}
              onValueChange={(value) => onShootOutSelectedTwoChange(value)}
            >
              <Radio
                description="팀2 승부차기 승리"
                value="shootout_win"
                color="primary"
                classNames={{
                  base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-primary'
                  )
                }}
              >
                승부차기 승리
              </Radio>
              <Radio
                description="팀2 승부차기 패배"
                value="shootout_defeat"
                color="danger"
                classNames={{
                  base: cn(
                    'inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between',
                    'flex-row-reverse max-w-[300px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent',
                    'data-[selected=true]:border-danger'
                  )
                }}
              >
                승부차기 패배
              </Radio>
            </RadioGroup>
          )}
        </div>
      </div>
      <Button fullWidth size="lg" variant="bordered" color="success" onPress={onNextHandler}>
        다음
      </Button>
    </div>
  )
}
