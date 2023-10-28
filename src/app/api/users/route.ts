import { NextResponse } from 'next/server'
import Prisma from '@prisma/client'

export const prisma = new Prisma.PrismaClient()

export async function GET() {
  const users = await prisma.user.findMany()

  return NextResponse.json({ users })
}
