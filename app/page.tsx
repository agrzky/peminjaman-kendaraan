"use client"
import { useState } from "react"
import { Car, Bike, Truck, Ambulance, User } from "lucide-react"
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
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <img 
              src="/assets/Logo.png" 
              alt="Logo BKN" 
              className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert" 
            />
            <span className="text-base sm:text-lg font-semibold">PusbangSDM</span>
          </div>
          <Link href="/login">
            <Button 
              className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all"
            >
              Login
            </Button>
          </Link>
        </div>

        <div className="container mx-auto text-center py-8 sm:py-12 px-4">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
              <span className="block mb-2 text-white/90">Selamat Datang di</span>
              <span className="block font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white">
                Sistem Peminjaman Kendaraan
              </span>
            </h1>
            <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto mt-8 sm:mt-10">
              {[
                { icon: Car, label: "Mobil" },
                { icon: Bike, label: "Motor" },
                { icon: Truck, label: "Pickup" },
                { icon: Ambulance, label: "Ambulans" }
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-2">
                  <div className="p-3 bg-white/10 rounded-lg hover:bg-white/20 transition-all backdrop-blur-sm group">
                    <Icon className="w-6 h-6 text-white/90 group-hover:text-white" />
                  </div>
                  <span className="text-xs text-white/70">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Form section */}
      <div className="flex-1 w-full bg-gray-50 flex items-center py-8 px-4">
        <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 w-full max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent tracking-tight">
            Formulir Peminjaman
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            {/* Nama Peminjam */}
            <div>
              <label htmlFor="nama" className="block mb-2 font-semibold text-gray-700">Nama Peminjam</label>
              <Input
                id="nama"
                placeholder="Masukkan nama Anda"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            {/* No. Handphone */}
            <div>
              <label htmlFor="handphone" className="block mb-2 font-semibold text-gray-700">No. Handphone</label>
              <Input
                id="handphone"
                placeholder="Contoh: 08123456789"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>

            {/* Jenis Kendaraan */}
            <div>
              <label htmlFor="jenis" className="block mb-2 font-semibold text-gray-700">Jenis Kendaraan</label>
              <Select onValueChange={(value) => setSelectedVehicleType(value)}>
                <SelectTrigger className="h-11 text-base border-2 shadow-sm">
                  <SelectValue placeholder="Pilih jenis kendaraan"/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="car"><div className="flex items-center"><Car className="w-5 h-5 mr-2" />Mobil</div></SelectItem>
                  <SelectItem value="motorcycle"><div className="flex items-center"><Bike className="w-5 h-5 mr-2" />Motor</div></SelectItem>
                  <SelectItem value="pickup"><div className="flex items-center"><Truck className="w-5 h-5 mr-2" />Pickup</div></SelectItem>
                  <SelectItem value="ambulance"><div className="flex items-center"><Ambulance className="w-5 h-5 mr-2" />Ambulans</div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Driver */}
            <div>
              <label htmlFor="driver" className="block mb-2 font-semibold text-gray-700">Driver</label>
              <Select onValueChange={(value) => setFormData({ ...formData, driverId: value })}>
                <SelectTrigger className="h-11 text-base border-2 shadow-sm">
                  <SelectValue placeholder={<div className="flex items-center"><User className="w-5 h-5 mr-2 text-gray-400" />Pilih driver</div>}/>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="driver1"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Setio</div></SelectItem>
                  <SelectItem value="driver2"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Akhid</div></SelectItem>
                  <SelectItem value="driver3"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Membawa Sendiri</div></SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Tanggal Mulai */}
            <div>
              <label htmlFor="tanggalMulai" className="block mb-2 font-semibold text-gray-700">Tanggal Mulai</label>
              <Input
                id="tanggalMulai" type="date"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
              />
            </div>

            {/* Waktu Mulai */}
            <div>
              <label htmlFor="waktuMulai" className="block mb-2 font-semibold text-gray-700">Waktu Mulai</label>
              <Input
                id="waktuMulai" type="time"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.startTime}
                onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
              />
            </div>

            {/* Tanggal Akhir */}
            <div>
              <label htmlFor="tanggalAkhir" className="block mb-2 font-semibold text-gray-700">Tanggal Akhir</label>
              <Input
                id="tanggalAkhir" type="date"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
              />
            </div>

            {/* Waktu Akhir */}
            <div>
              <label htmlFor="waktuAkhir" className="block mb-2 font-semibold text-gray-700">Waktu Akhir</label>
              <Input
                id="waktuAkhir" type="time"
                className="h-11 text-base border-2 focus:border-blue-500 shadow-sm"
                value={formData.endTime}
                onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
              />
            </div>
          </div>

          {/* Tujuan Peminjaman */}
          <div className="mt-5">
            <label htmlFor="tujuan" className="block mb-2 font-semibold text-gray-700">Tujuan Peminjaman</label>
            <Textarea
                id="tujuan"
                placeholder="Jelaskan tujuan peminjaman kendaraan..."
                className="h-28 text-base border-2 focus:border-blue-500 shadow-sm w-full"
                value={formData.purpose}
                onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
              />
          </div>

          {/* Tombol Ajukan */}
          <div className="mt-8">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg py-3"
              onClick={async () => {
                // ... (Fungsi submit tetap sama)
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