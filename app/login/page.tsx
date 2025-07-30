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
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="relative z-10 w-full max-w-md mx-auto">
        {/* Logo and Vehicle Icons */}
        <div className="mb-6 flex flex-col items-center text-center">
            <Link href="/" className="flex items-center gap-4 mb-6 text-white hover:opacity-90 transition-opacity">
                <img
                    src="/assets/Logo.png"
                    alt="Logo"
                    className="w-12 h-12 brightness-0 invert"
                />
                <div>
                    <span className="block font-semibold text-lg">Aplikasi Minjam</span>
                    <span className="block font-semibold text-lg">Kendaraan</span>
                </div>
            </Link>

          <div className="grid grid-cols-4 gap-4 w-full max-w-xs mx-auto">
            {[
                { Icon: Car, label: "Mobil" },
                { Icon: Bike, label: "Motor" },
                { Icon: Truck, label: "Pickup" },
                { Icon: Ambulance, label: "Ambulan" }
            ].map(({ Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                    <div className="p-3 bg-white/10 backdrop-blur-md rounded-xl hover:bg-white/20 transition-all cursor-pointer border border-white/20">
                        <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white/70 text-xs">{label}</span>
                </div>
            ))}
          </div>
        </div>

        {/* Login Form */}
        <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 sm:p-8 border border-white/20">
          <div className="text-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 bg-clip-text text-transparent">
              Selamat Datang
            </h1>
            <p className="text-gray-600 mt-2 font-medium">
              Silakan masuk untuk melanjutkan
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-gray-700 font-semibold">
                Email
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 h-11 bg-gray-50/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg placeholder:text-gray-400"
                  placeholder="Masukkan email"
                  required
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="password" className="text-gray-700 font-semibold">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 h-11 bg-gray-50/80 border-gray-200 focus:border-purple-500 focus:ring-purple-500/20 rounded-lg placeholder:text-gray-400"
                  placeholder="Masukkan password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Checkbox
                        id="rememberMe"
                        checked={formData.rememberMe}
                        onCheckedChange={handleCheckboxChange}
                        className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500/20"
                    />
                    <Label
                        htmlFor="rememberMe"
                        className="ml-2 text-gray-600 font-medium select-none cursor-pointer"
                    >
                        Ingat saya
                    </Label>
                </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-center text-red-700 bg-red-100 border border-red-200 rounded-lg">
                {error}
              </div>
            )}
            
            <div className="pt-2 space-y-3">
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 hover:from-blue-700 hover:via-purple-700 hover:to-purple-900 text-white font-semibold py-3 text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Memproses..." : "Masuk"}
                </Button>

                <Link
                  href="/"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50/50 rounded-lg transition-colors text-sm sm:text-base font-medium"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Halaman Utama
                </Link>
            </div>
          </form>
        </div>

        {/* Footer */}
        <footer className="mt-6 text-center">
          <p className="text-white/70 text-sm">
            © {new Date().getFullYear()} PusbangSDM BKN. All rights reserved.
          </p>
        </footer>
      </div>
    </main>
  )
}