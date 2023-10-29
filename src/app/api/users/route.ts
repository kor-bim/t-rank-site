import { NextResponse } from 'next/server'
import { db } from '@/libs'

export const revalidate = 0

export async function GET() {
  const users = await db.user.findMany()

  return NextResponse.json(users)
}
