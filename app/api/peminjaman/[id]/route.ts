import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const body = await request.json()
    const { status } = body

    const updatedPeminjaman = await prisma.peminjaman.update({
      where: { id },
      data: { status }
    })

    return NextResponse.json(updatedPeminjaman)
  } catch (error) {
    console.error('Error updating peminjaman:', error)
    return NextResponse.json(
      { error: 'Error updating peminjaman' },
      { status: 500 }
    )
  }
}