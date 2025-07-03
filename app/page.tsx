"use client"
import { useState } from "react"
import { Car, Bike, Truck, Ambulance, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import Link from "next/link"
import { toast } from "sonner"

export default function PeminjamanKendaraan() {
  // State untuk loading dan error
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State untuk form data, termasuk selectedVehicleType
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
    vehicleType: "", // Menggabungkan selectedVehicleType ke dalam formData
    driverId: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    purpose: ""
  });

  // Handler umum untuk semua input, select, dan textarea
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (name: keyof typeof formData, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError(null);

    // Validasi sederhana
    for (const key in formData) {
        if (formData[key as keyof typeof formData] === "") {
            toast.error(`Harap isi semua kolom`);
            setLoading(false);
            return;
        }
    }

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            // Mengirim data dari state formData
            name: formData.name,
            phoneNumber: formData.phoneNumber,
            vehicleType: formData.vehicleType,
            driverId: formData.driverId,
            startDate: formData.startDate,
            startTime: formData.startTime,
            endDate: formData.endDate,
            endTime: formData.endTime,
            purpose: formData.purpose
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal mengajukan peminjaman');
      }

      toast.success('Data peminjaman berhasil dikirim!');
      
      // Reset form setelah berhasil
      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (error: any) {
      console.error('Error submitting booking:', error);
      setError(error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
            <div className="flex items-center space-x-3">
                <img src="/assets/Logo.png" alt="Logo BKN" className="w-9 h-9 sm:w-10 sm:h-10 object-contain brightness-0 invert" />
                <span className="text-base sm:text-lg font-semibold">PusbangSDM</span>
            </div>
            <Link href="/login">
                <Button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white text-xs sm:text-sm px-3 py-1.5 rounded-full transition-all">
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
                    {/* Icons */}
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
            <div>
              <label htmlFor="name" className="block mb-2 font-semibold text-gray-700">Nama Peminjam</label>
              <Input id="name" placeholder="Masukkan nama Anda" onChange={handleChange} value={formData.name} className="h-11 text-base"/>
            </div>
            <div>
              <label htmlFor="phoneNumber" className="block mb-2 font-semibold text-gray-700">No. Handphone</label>
              <Input id="phoneNumber" placeholder="Contoh: 08123456789" onChange={handleChange} value={formData.phoneNumber} className="h-11 text-base"/>
            </div>
            <div>
              <label htmlFor="vehicleType" className="block mb-2 font-semibold text-gray-700">Jenis Kendaraan</label>
              <Select onValueChange={(value) => handleSelectChange('vehicleType', value)} value={formData.vehicleType}>
                <SelectTrigger className="h-11 text-base"><SelectValue placeholder="Pilih jenis kendaraan"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="car"><div className="flex items-center"><Car className="w-5 h-5 mr-2" />Mobil</div></SelectItem>
                    <SelectItem value="motorcycle"><div className="flex items-center"><Bike className="w-5 h-5 mr-2" />Motor</div></SelectItem>
                    <SelectItem value="pickup"><div className="flex items-center"><Truck className="w-5 h-5 mr-2" />Pickup</div></SelectItem>
                    <SelectItem value="ambulance"><div className="flex items-center"><Ambulance className="w-5 h-5 mr-2" />Ambulans</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="driverId" className="block mb-2 font-semibold text-gray-700">Driver</label>
              <Select onValueChange={(value) => handleSelectChange('driverId', value)} value={formData.driverId}>
                <SelectTrigger className="h-11 text-base"><SelectValue placeholder="Pilih driver"/></SelectTrigger>
                <SelectContent>
                    <SelectItem value="Setio"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Setio</div></SelectItem>
                    <SelectItem value="Akhid"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Akhid</div></SelectItem>
                    <SelectItem value="Membawa Sendiri"><div className="flex items-center"><User className="w-5 h-5 mr-2" />Membawa Sendiri</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label htmlFor="startDate" className="block mb-2 font-semibold text-gray-700">Tanggal Mulai</label>
              <Input id="startDate" type="date" onChange={handleChange} value={formData.startDate} className="h-11 text-base"/>
            </div>
            <div>
              <label htmlFor="startTime" className="block mb-2 font-semibold text-gray-700">Waktu Mulai</label>
              <Input id="startTime" type="time" onChange={handleChange} value={formData.startTime} className="h-11 text-base"/>
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2 font-semibold text-gray-700">Tanggal Akhir</label>
              <Input id="endDate" type="date" onChange={handleChange} value={formData.endDate} className="h-11 text-base"/>
            </div>
            <div>
              <label htmlFor="endTime" className="block mb-2 font-semibold text-gray-700">Waktu Akhir</label>
              <Input id="endTime" type="time" onChange={handleChange} value={formData.endTime} className="h-11 text-base"/>
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="purpose" className="block mb-2 font-semibold text-gray-700">Tujuan Peminjaman</label>
            <Textarea id="purpose" placeholder="Jelaskan tujuan peminjaman..." onChange={handleChange} value={formData.purpose} className="h-28 text-base"/>
          </div>

          <div className="mt-8">
            <Button 
              className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold text-lg py-3"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? 'Mengirim...' : 'Ajukan Peminjaman'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}