import { PrismaClient, UserRole } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

async function main() {
  try {
    // Hash password for admin
    const hashedPassword = await bcrypt.hash("admin123", 10)

    // Create admin user
    const admin = await prisma.users.create({
      data: {
        name: "Admin Pusbang",
        email: "admin@pusbang.com",
        password: hashedPassword,
        role: UserRole.admin,
      },
    })

    console.log("Admin user created:", admin)
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