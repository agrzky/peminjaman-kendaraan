import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const peminjaman = await prisma.peminjaman.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error fetching peminjaman:', error)
    return NextResponse.json(
      { error: 'Error fetching peminjaman' },
      { status: 500 }
    )
  }
}