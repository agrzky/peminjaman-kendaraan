import { PrismaClient, UserRole, VehicleType, BorrowStatus } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    // Hash password for admin
    const hashedPassword = await bcrypt.hash("admin123", 10)

    // Create admin user if not exists
    const admin = await prisma.users.upsert({
      where: { email: "admin@pusbang.com" },
      update: {},
      create: {
        name: "Admin Pusbang",
        email: "admin@pusbang.com",
        password: hashedPassword,
        role: UserRole.admin,
      },
    })

    console.log("Admin user created:", admin)

    // Create some sample peminjaman data
    const peminjaman = await prisma.peminjaman.createMany({
      data: [
        {
          nama: "Ahmad Fauzi",
          handphone: "081234567890",
          vehicleType: VehicleType.car,
          driver: "Pak Joko",
          startDate: new Date("2024-03-18"),
          startTime: new Date("2024-03-18T08:00:00Z"),
          endDate: new Date("2024-03-18"),
          endTime: new Date("2024-03-18T16:00:00Z"),
          status: BorrowStatus.pending,
          purpose: "Kunjungan Dinas ke Kantor Regional III BKN Bandung"
        },
        {
          nama: "Siti Nurhalizah",
          handphone: "081234567891",
          vehicleType: VehicleType.motorcycle,
          driver: null,
          startDate: new Date("2024-03-18"),
          startTime: new Date("2024-03-18T09:00:00Z"),
          endDate: new Date("2024-03-18"),
          endTime: new Date("2024-03-18T14:00:00Z"),
          status: BorrowStatus.pending,
          purpose: "Pengantaran Dokumen ke Kantor Pusat BKN"
        },
        {
          nama: "Budi Santoso",
          handphone: "081234567892",
          vehicleType: VehicleType.car,
          driver: "Pak Eko",
          startDate: new Date("2024-03-18"),
          startTime: new Date("2024-03-18T07:30:00Z"),
          endDate: new Date("2024-03-18"),
          endTime: new Date("2024-03-18T17:00:00Z"),
          status: BorrowStatus.pending,
          purpose: "Elf Vario Elf"
        }
      ],
      skipDuplicates: true,
    })

    console.log("Sample peminjaman created:", peminjaman)
  } catch (error) {
    console.error("Error seeding database:", error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })