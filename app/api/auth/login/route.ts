import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email dan password harus diisi" },
        { status: 400 }
      )
    }

    // Find user by email
    const user = await prisma.users.findUnique({
      where: { email },
    })

    if (!user) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Check if user is admin
    if (user.role !== "admin") {
      return NextResponse.json(
        { message: "Akses ditolak. Anda bukan administrator" },
        { status: 403 }
      )
    }

    // Verify password (temporary direct comparison for testing)
    const passwordMatch = password === "admin@2025"

    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Email atau password salah" },
        { status: 401 }
      )
    }

    // Return success response with user data (excluding password)
    const { password: _, ...userWithoutPassword } = user
    return NextResponse.json({
      message: "Login berhasil",
      user: userWithoutPassword,
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      { message: "Terjadi kesalahan pada server" },
      { status: 500 }
    )
  }
}