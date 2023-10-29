import { NextResponse } from 'next/server'
import { prisma } from '@/libs'

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json(users)
}
