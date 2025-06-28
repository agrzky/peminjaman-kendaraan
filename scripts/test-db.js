const { PrismaClient } = require('@prisma/client')

async function testDatabaseConnection() {
  const prisma = new PrismaClient()
  
  try {
    console.log('Testing database connection...')
    
    // Test connection
    await prisma.$connect()
    console.log('✅ Database connection successful')
    
    // Test query
    const peminjamanCount = await prisma.peminjaman.count()
    console.log(`✅ Found ${peminjamanCount} peminjaman records`)
    
    // Test recent data
    const recentPeminjaman = await prisma.peminjaman.findMany({
      take: 5,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    console.log('✅ Recent peminjaman data:')
    recentPeminjaman.forEach((item, index) => {
      console.log(`  ${index + 1}. ${item.nama} - ${item.status} - ${item.createdAt}`)
    })
    
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection() 