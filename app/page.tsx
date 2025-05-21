"use client"
import { useState } from "react"
import { Car, Bike, Bus, Truck, Stethoscope, Ambulance, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function PeminjamanKendaraan() {
  const router = useRouter()
  const [selectedVehicleType, setSelectedVehicleType] = useState<string>("")  
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    driverId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    purpose: ""
  })

  // Function to get the appropriate icon based on vehicle type
  const getVehicleIcon = () => {
    switch (selectedVehicleType) {
      case "car":
        return <Car className="w-5 h-5 mr-2" />
      case "motorcycle":
        return <Bike className="w-5 h-5 mr-2" />
      case "pickup":
        return <Truck className="w-5 h-5 mr-2" />
      case "ambulance":
        return <Ambulance className="w-5 h-5 mr-2" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header with gradient background */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        {/* Top navigation bar */}
        <div className="container mx-auto px-3 sm:px-4 py-2 flex justify-between items-center">
          {/* Logo and Title */}
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
              {/* <span className="text-[10px] sm:text-sm text-white/70 sm:hidden">Sistem Peminjaman</span> */}
              <div className="hidden sm:flex items-center space-x-2">
                <span className="text-white/50">|</span>
                {/* <span className="text-sm text-white/70">Sistem Peminjaman</span> */}
              </div>
            </div>
          </div>

          {/* Login button */}
          <Link href="/login">
            <Button 
              className={[
                "bg-white/10 backdrop-blur-sm border border-white/20",
                "hover:bg-white/20 text-white text-xs sm:text-sm",
                "px-3 sm:px-4 py-1.5 rounded-full transition-all duration-200"
              ].join(" ")}
            >
              Login
            </Button>
          </Link>
        </div>

        {/* Main header content */}
        <div className="container mx-auto text-center py-8 sm:py-12 md:py-16 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              <span className="block mb-2 text-white/90">Selamat Datang di</span>
              <span className="block font-extrabold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                Sistem Peminjaman Kendaraan
              </span>
            </h1>
            {/* <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl mx-auto">
              Kelola peminjaman kendaraan dengan mudah dan efisien
            </p> */}

            {/* Vehicle type icons */}
            <div className="grid grid-cols-4 gap-4 sm:gap-6 max-w-lg mx-auto mt-8 sm:mt-10">
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
        </div>
      </div>

      {/* Form section */}
      <div className="flex-1 flex justify-center items-start py-4 sm:py-6 md:py-8 px-2 sm:px-4 md:px-6">
        <div className="bg-white rounded-lg shadow-xl p-4 sm:p-6 md:p-8 w-full max-w-4xl mx-auto">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6 md:mb-8 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Formulir Peminjaman Kendaraan
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
            {/* Nama Peminjam */}
            <div>
              <label htmlFor="nama" className="block mb-1.5 sm:mb-2 font-bold text-gray-700 text-sm sm:text-base">
                Nama Peminjam
              </label>
              <Input
                id="nama"
                placeholder="Masukkan nama peminjam"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* No. Handphone */}
            <div>
              <label htmlFor="handphone" className="block mb-2 font-bold text-gray-700">
                No. Handphone
              </label>
              <Input
                id="handphone"
                placeholder="Masukkan nomor handphone"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            {/* Jenis Kendaraan */}
            <div>
              <label htmlFor="jenis" className="block mb-1.5 sm:mb-2 font-bold text-gray-700 text-sm sm:text-base">
                Jenis Kendaraan
              </label>
              <Select onValueChange={(value) => setSelectedVehicleType(value)}>
                <SelectTrigger className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 shadow-sm">
                  <SelectValue
                    placeholder={
                      <>
                        {selectedVehicleType && getVehicleIcon()}
                        {selectedVehicleType
                          ? `${selectedVehicleType.charAt(0).toUpperCase() + selectedVehicleType.slice(1)}`
                          : "Pilih jenis kendaraan"}
                      </>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car">
                    <div className="flex items-center">
                      <Car className="w-5 h-5 mr-2" />
                      <span>Mobil</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="motorcycle">
                    <div className="flex items-center">
                      <Bike className="w-5 h-5 mr-2" />
                      <span>Motor</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pickup">
                    <div className="flex items-center">
                      <Truck className="w-5 h-5 mr-2" />
                      <span>Pickup</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ambulance">
                    <div className="flex items-center">
                      <Ambulance className="w-5 h-5 mr-2" />
                      <span>Ambulance</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver */}
            <div>
              <label htmlFor="driver" className="block mb-1.5 sm:mb-2 font-bold text-gray-700 text-sm sm:text-base">
                Driver
              </label>
              <Select onValueChange={(value) => setFormData({ ...formData, driverId: value })}>
                <SelectTrigger className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 border-gray-300 shadow-sm">
                  <SelectValue
                    placeholder={
                      <div className="flex items-center">
                        <User className="w-5 h-5 mr-2 text-gray-500" />
                        <span>Pilih driver</span>
                      </div>
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver1">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span>Setio</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="driver2">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span>Akhid</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="driver3">
                    <div className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      <span>Membawa Sendiri</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tanggal Mulai Peminjaman */}
            <div>
              <label htmlFor="tanggalMulai" className="block mb-2 font-bold text-gray-700">
                Tanggal Mulai Peminjaman
              </label>
              <Input
                id="tanggalMulai"
                type="date"
                placeholder="dd/mm/yyyy"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            {/* Waktu Mulai Peminjaman */}
            <div>
              <label htmlFor="waktuMulai" className="block mb-2 font-bold text-gray-700">
                Waktu Mulai Peminjaman
              </label>
              <Input
                id="waktuMulai"
                type="time"
                placeholder="--:--"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            {/* Tanggal Akhir Peminjaman */}
            <div>
              <label htmlFor="tanggalAkhir" className="block mb-2 font-bold text-gray-700">
                Tanggal Akhir Peminjaman
              </label>
              <Input
                id="tanggalAkhir"
                type="date"
                placeholder="dd/mm/yyyy"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            {/* Waktu Akhir Peminjaman */}
            <div>
              <label htmlFor="waktuAkhir" className="block mb-2 font-bold text-gray-700">
                Waktu Akhir Peminjaman
              </label>
              <Input
                id="waktuAkhir"
                type="time"
                placeholder="--:--"
                className="w-full text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          {/* Tujuan Peminjaman */}
          <div className="mt-4 sm:mt-5 md:mt-6">
            <label htmlFor="tujuan" className="block mb-1.5 sm:mb-2 font-bold text-gray-700 text-sm sm:text-base">
              Tujuan Peminjaman
            </label>
            <Textarea
                id="tujuan"
                placeholder="Masukkan tujuan peminjaman"
                className="h-20 sm:h-24 md:h-32 text-sm sm:text-base p-2 sm:p-2.5 font-medium border-2 focus:border-blue-500 shadow-sm w-full"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
          </div>

          {/* Buttons */}
          <div className="w-full mt-4 sm:mt-6 md:mt-8">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-sm sm:text-base md:text-lg py-3 sm:py-4 md:py-5"
              onClick={async () => {
                try {
                  const response = await fetch('/api/bookings', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      name: formData.name,
                      phoneNumber: formData.phoneNumber,
                      vehicleType: selectedVehicleType,
                      driverId: formData.driverId,
                      startDate: formData.startDate,
                      startTime: formData.startTime,
                      endDate: formData.endDate,
                      endTime: formData.endTime,
                      purpose: formData.purpose
                    }),
                  })

                  if (!response.ok) {
                    throw new Error('Failed to submit booking')
                  }

                  const data = await response.json()
                  
                  // Reset form
                  setFormData({
                    name: "",
                    phoneNumber: "",
                    driverId: "",
                    startDate: "",
                    startTime: "",
                    endDate: "",
                    endTime: "",
                    purpose: ""
                  })
                  setSelectedVehicleType("")
                  
                  toast.success('Data peminjaman berhasil dikirim!', {
                    onAutoClose: () => {
                      window.location.reload()
                    }
                  })
                } catch (error) {
                  console.error('Error submitting booking:', error)
                  toast.error('Gagal mengajukan peminjaman')
                }
              }}
            >
              Ajukan Peminjaman
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
