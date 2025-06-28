import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    console.log('Fetching peminjaman data...')
    
    const peminjaman = await prisma.peminjaman.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log(`Found ${peminjaman.length} peminjaman records`)
    
    // Set headers untuk mencegah caching
    const response = NextResponse.json(peminjaman)
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')
    response.headers.set('Surrogate-Control', 'no-store')
    
    return response
  } catch (error) {
    console.error('Error fetching peminjaman:', error)
    return NextResponse.json(
      { error: 'Error fetching peminjaman', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}