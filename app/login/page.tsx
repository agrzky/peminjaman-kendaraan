"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Car, Bike, Truck, Ambulance, Lock, User, Eye, EyeOff, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"

export default function LoginPage() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError("") // Clear error when user types
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || "Login gagal")
      }

      // Redirect to dashboard on successful login
      router.push("/dashboard")
    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat login")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
      {/* Noise texture */}
      <div className="absolute inset-0 bg-[url('/assets/noise.png')] mix-blend-overlay opacity-25" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-screen">
        {/* Logo and Vehicle Icons */}
        <div className="w-full max-w-md mx-auto mb-8 flex flex-col items-center">
          <div className="flex items-center gap-2 mb-6">
            <img
              src="/assets/Logo.png"
              alt="Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 brightness-0 invert"
            />
            <span className="text-white font-semibold text-lg sm:text-xl md:text-2xl">
              Sistem Peminjaman
            </span>
          </div>

          <div className="grid grid-cols-4 gap-4 w-full max-w-xs mx-auto">
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                <Car className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white/70 text-xs sm:text-sm">Mobil</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                <Bike className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white/70 text-xs sm:text-sm">Motor</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                <Truck className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white/70 text-xs sm:text-sm">Pickup</span>
            </div>
            <div className="flex flex-col items-center gap-2">
              <div className="p-3 sm:p-4 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                <Ambulance className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <span className="text-white/70 text-xs sm:text-sm">Ambulan</span>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full max-w-md mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 bg-clip-text text-transparent">
              Selamat Datang
            </h1>
            <p className="text-gray-600 mt-3 font-medium">
              Silakan masuk untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700 font-semibold text-sm sm:text-base">
                Email
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <User className="h-[18px] w-[18px] text-gray-500" />
                </div>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-gray-50/80 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg placeholder:text-gray-400"
                  placeholder="Masukkan email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 font-semibold text-sm sm:text-base">
                Password
              </Label>
              <div className="relative">
                <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                  <Lock className="h-[18px] w-[18px] text-gray-500" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-gray-50/80 border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 rounded-lg placeholder:text-gray-400"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-[18px] w-[18px]" />
                  ) : (
                    <Eye className="h-[18px] w-[18px]" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <Checkbox
                id="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={handleCheckboxChange}
                className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-2 focus:ring-purple-500/20"
              />
              <Label
                htmlFor="rememberMe"
                className="ml-2 text-gray-600 font-medium text-sm sm:text-base select-none"
              >
                Ingat saya
              </Label>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-lg">
                {error}
              </div>
            )}

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 hover:from-blue-700 hover:via-purple-700 hover:to-purple-900 text-white font-semibold py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? "Memproses..." : "Masuk"}
            </Button>

            <Link
              href="/"
              className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-colors text-sm sm:text-base font-medium"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Halaman Utama
            </Link>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-white/70 text-sm">
            © 2024 Pusbang ASN BKN. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}
