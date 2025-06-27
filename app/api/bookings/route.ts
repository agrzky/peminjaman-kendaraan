import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      phoneNumber,
      vehicleType,
      driverId,
      startDate,
      startTime,
      endDate,
      endTime,
      purpose
    } = body

    // Create peminjaman
    const peminjaman = await prisma.peminjaman.create({
      data: {
        nama: name,
        handphone: phoneNumber,
        vehicleType,
        driver: driverId,
        startDate: new Date(startDate),
        startTime: new Date(`1970-01-01T${startTime}:00`),
        endDate: new Date(endDate),
        endTime: new Date(`1970-01-01T${endTime}:00`),
        purpose
      }
    })

    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error creating peminjaman:', error)
    return NextResponse.json(
      { error: 'Error creating peminjaman' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const peminjaman = await prisma.peminjaman.findMany()
    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error fetching peminjaman:', error)
    return NextResponse.json(
      { error: 'Error fetching peminjaman' },
      { status: 500 }
    )
  }
}