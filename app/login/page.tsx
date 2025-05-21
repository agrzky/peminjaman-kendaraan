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
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      rememberMe: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      // Redirect to dashboard
      router.push("/dashboard")
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Top navigation with logo */}
      <div className="container mx-auto px-3 sm:px-4 py-2">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="flex items-center justify-center w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10">
            <img 
              src="/assets/Logo.png" 
              alt="Logo BKN" 
              className="w-full h-full object-contain brightness-0 invert" 
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
            <span className="text-sm sm:text-base font-semibold text-white">Pusbangpeg ASN</span>
            <span className="text-[10px] sm:text-sm text-white/70 sm:hidden">Sistem Peminjaman</span>
            <div className="hidden sm:flex items-center space-x-2">
              <span className="text-white/50">|</span>
              <span className="text-sm text-white/70">Sistem Peminjaman</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        {/* Logo and icons */}
        <div className="text-center mb-6 px-4">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">
            Sistem Peminjaman Kendaraan
          </h1>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white mb-6 tracking-tight">
            Pusbangpeg ASN
          </h2>

          {/* Vehicle type icons */}
          <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-lg mx-auto mt-8 mb-8">
            {[
              { icon: Car, label: "Mobil" },
              { icon: Bike, label: "Motor" },
              { icon: Truck, label: "Pickup" },
              { icon: Ambulance, label: "Ambulance" }
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex flex-col items-center gap-2">
                <div className="p-2 sm:p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all duration-200 backdrop-blur-sm group">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white" />
                </div>
                <span className="text-[10px] sm:text-xs text-white/70">{label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Login form */}
        <div className="bg-white rounded-xl shadow-2xl p-6 sm:p-8 w-full max-w-md mx-auto">
          <div className="text-center mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              Login Administrator
            </h3>
            <p className="text-gray-500 mt-2 text-sm sm:text-base">Masukkan kredensial untuk mengakses dashboard</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="space-y-4 sm:space-y-6">
              {/* Username field */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 font-bold">
                  Username
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="username"
                    name="username"
                    placeholder="Masukkan username"
                    className="pl-10 py-5 sm:py-6 font-medium border-2 focus:border-purple-500"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label htmlFor="password" className="text-gray-700 font-bold">
                    Password
                  </Label>
                  <a href="#" className="text-xs sm:text-sm text-purple-600 hover:text-purple-800 font-medium">
                    Lupa password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Masukkan password"
                    className="pl-10 py-5 sm:py-6 font-medium border-2 focus:border-purple-500"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rememberMe" checked={formData.rememberMe} onCheckedChange={handleCheckboxChange} />
                  <Label htmlFor="rememberMe" className="text-gray-600 font-medium text-sm sm:text-base">
                    Ingat saya
                  </Label>
                </div>
              </div>

              {/* Login button */}
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800 hover:from-blue-700 hover:via-purple-700 hover:to-purple-900 text-white font-semibold py-2.5 text-sm sm:text-base rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? "Memproses..." : "Login"}
              </Button>

              {/* Back to home */}
              <Link
                href="/"
                className="mt-4 w-full flex items-center justify-center px-4 py-2 text-sm sm:text-base text-purple-600 hover:text-purple-700 font-medium transition-colors gap-1.5 rounded-lg hover:bg-purple-50/50"
              >
                <ArrowLeft className="h-4 w-4" /> Kembali ke Halaman Utama
              </Link>
            </div>
          </form>

          <div className="mt-6 sm:mt-8 text-center">
            <p className="text-gray-600 text-sm sm:text-base">
              Belum punya akun?{" "}
              <a href="#" className="text-purple-600 hover:text-purple-700 font-semibold transition-colors">
                Hubungi administrator
              </a>
            </p>
          </div>
        </div>
        <div className="mt-6 sm:mt-8 text-center">
            <p className="text-white/70 text-xs sm:text-sm">&copy; 2025 Pusbangpeg ASN. Hak Cipta Dilindungi.</p>
          </div>
      </div>
    </div>
  )
}
