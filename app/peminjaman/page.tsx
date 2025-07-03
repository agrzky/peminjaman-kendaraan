"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, CheckCircle, XCircle, Filter, Car, Bike, Truck, Ambulance, Home, FileText, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<string>("all")
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    fetchPeminjaman()
  }, [])

  const fetchPeminjaman = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/peminjaman')
      const data = await response.json()
      setPeminjaman(data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching peminjaman:', error)
      setLoading(false)
      toast.error("Gagal memuat data peminjaman")
    }
  }

  const handleStatusUpdate = async (id: number, status: string) => {
    try {
      const response = await fetch(`/api/peminjaman/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast.success(`Peminjaman berhasil ${status === 'approved' ? 'disetujui' : 'ditolak'}`)
        fetchPeminjaman()
      } else {
        toast.error(`Gagal ${status === 'approved' ? 'menyetujui' : 'menolak'} peminjaman`)
      }
    } catch (error) {
      console.error(`Error updating peminjaman status:`, error)
      toast.error(`Gagal ${status === 'approved' ? 'menyetujui' : 'menolak'} peminjaman`)
    }
  }

  // Get statistics
  const totalPeminjaman = peminjaman.length
  const menungguPersetujuan = peminjaman.filter((item) => item.status === 'pending').length
  const disetujuiHariIni = peminjaman.filter((item) => {
    const today = new Date()
    const itemDate = new Date(item.startDate)
    return item.status === 'approved' && 
           itemDate.getDate() === today.getDate() &&
           itemDate.getMonth() === today.getMonth() &&
           itemDate.getFullYear() === today.getFullYear()
  }).length

  // Function to get icon based on vehicle type
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "car":
        return <Car className="h-5 w-5" />
      case "motorcycle":
        return <Bike className="h-5 w-5" />
      case "pickup":
        return <Truck className="h-5 w-5" />
      case "ambulance":
        return <Ambulance className="h-5 w-5" />
      default:
        return <Car className="h-5 w-5" />
    }
  }

  // Function to get status badge
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-100 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" /> Disetujui
          </Badge>
        )
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 flex items-center gap-1">
            <XCircle className="h-3 w-3" /> Ditolak
          </Badge>
        )
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100 flex items-center gap-1">
            <Clock className="h-3 w-3" /> Menunggu
          </Badge>
        )
      default:
        return null
    }
  }

  // Format date to Indonesian format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  // Filter peminjaman based on status
  const filteredPeminjaman = filter === 'all' 
    ? peminjaman 
    : peminjaman.filter(item => item.status === filter)

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 border-r border-gray-200 min-h-screen p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
            <Calendar className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">PusbangSDM BKN</h1>
        </div>
        <nav className="space-y-1">
          <Link href="/dashboard">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Home className="h-5 w-5" />
              Dashboard
            </Button>
          </Link>
          <Link href="/peminjaman">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <Calendar className="h-5 w-5" />
              Peminjaman
            </Button>
          </Link>
          <Link href="/laporan">
            <Button variant="ghost" className="w-full justify-start gap-3">
              <FileText className="h-5 w-5" />
              Laporan
            </Button>
          </Link>
        </nav>
      </div>
      {/* Sidebar Mobile (Drawer) */}
      <Sheet open={sidebarOpen} onOpenChange={setSidebarOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-full bg-white/80 shadow"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-6 w-6 text-gray-700" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-64">
          <div className="flex items-center gap-3 mb-6 p-4 border-b">
            <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-xl font-bold">PusbangSDM BKN</h1>
          </div>
          <nav className="space-y-1 p-4">
            <Link href="/dashboard">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Home className="h-5 w-5" />
                Dashboard
              </Button>
            </Link>
            <Link href="/peminjaman">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <Calendar className="h-5 w-5" />
                Peminjaman
              </Button>
            </Link>
            <Link href="/laporan">
              <Button variant="ghost" className="w-full justify-start gap-3">
                <FileText className="h-5 w-5" />
                Laporan
              </Button>
            </Link>
          </nav>
        </SheetContent>
      </Sheet>
      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <h1 className="text-xl md:text-2xl font-bold mb-6">Manajemen Peminjaman Kendaraan</h1>
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Total Peminjaman</h3>
              <p className="text-2xl md:text-3xl font-bold">{totalPeminjaman}</p>
            </div>
            <div className="bg-blue-100 p-2 md:p-3 rounded-full">
              <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Menunggu Persetujuan</h3>
              <p className="text-2xl md:text-3xl font-bold">{menungguPersetujuan}</p>
            </div>
            <div className="bg-yellow-100 p-2 md:p-3 rounded-full">
              <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
            <div>
              <h3 className="text-xs md:text-sm text-gray-500 font-medium">Disetujui Hari Ini</h3>
              <p className="text-2xl md:text-3xl font-bold">{disetujuiHariIni}</p>
            </div>
            <div className="bg-green-100 p-2 md:p-3 rounded-full">
              <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
            </div>
          </div>
        </div>
        {/* Filter Controls */}
        <div className="bg-white rounded-lg shadow mb-6 p-4">
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={filter === 'all' ? "default" : "outline"}
              onClick={() => setFilter('all')}
              className="flex items-center gap-2"
            >
              Semua
            </Button>
            <Button 
              variant={filter === 'pending' ? "default" : "outline"}
              onClick={() => setFilter('pending')}
              className="flex items-center gap-2"
            >
              <Clock className="h-4 w-4" /> Menunggu
            </Button>
            <Button 
              variant={filter === 'approved' ? "default" : "outline"}
              onClick={() => setFilter('approved')}
              className="flex items-center gap-2"
            >
              <CheckCircle className="h-4 w-4" /> Disetujui
            </Button>
            <Button 
              variant={filter === 'rejected' ? "default" : "outline"}
              onClick={() => setFilter('rejected')}
              className="flex items-center gap-2"
            >
              <XCircle className="h-4 w-4" /> Ditolak
            </Button>
            <Button 
              variant="outline" 
              className="ml-auto"
              onClick={fetchPeminjaman}
            >
              Refresh
            </Button>
          </div>
        </div>
        {/* Peminjaman List */}
        <div className="bg-white rounded-lg shadow">
          {loading ? (
            <div className="p-8 text-center">
              <p>Memuat data peminjaman...</p>
            </div>
          ) : filteredPeminjaman.length === 0 ? (
            <div className="p-8 text-center">
              <p>Tidak ada data peminjaman {filter !== 'all' && `dengan status ${filter}`}</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredPeminjaman.map((item) => (
                <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                        {getVehicleIcon(item.vehicleType)}
                      </div>
                      <div>
                        <div className="font-medium">{item.nama}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(item.startDate)} • {item.startTime} - {item.endTime}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">Kontak:</span> {item.handphone || '-'}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.purpose || 'Tidak ada keterangan'}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {getStatusBadge(item.status)}
                      {item.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                            onClick={() => handleStatusUpdate(item.id, 'rejected')}
                          >
                            Tolak
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-green-600 hover:bg-green-700 text-white"
                            onClick={() => handleStatusUpdate(item.id, 'approved')}
                          >
                            Setujui
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Tabs defaultValue="pending" className="w-full mt-8">
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="pending">Menunggu Persetujuan</TabsTrigger>
              <TabsTrigger value="recent">Aktivitas Terbaru</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="pending">
            <div className="space-y-4">
              {peminjaman.filter(item => item.status === 'pending').map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                        {getVehicleIcon(item.vehicleType)}
                      </div>
                      <div>
                        <div className="font-medium">{item.nama}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(item.startDate)} • {item.startTime} - {item.endTime}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">{item.vehicleType}:</span> {item.purpose}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.purpose}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {getStatusBadge(item.status)}
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700" onClick={() => handleStatusUpdate(item.id, 'rejected')}>Tolak</Button>
                        <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white" onClick={() => handleStatusUpdate(item.id, 'approved')}>Setujui</Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="space-y-4">
              {[...peminjaman].sort((a, b) => Number(new Date(b.createdAt)) - Number(new Date(a.createdAt))).slice(0, 10).map((item) => (
                <div key={item.id} className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                        {getVehicleIcon(item.vehicleType)}
                      </div>
                      <div>
                        <div className="font-medium">{item.nama}</div>
                        <div className="text-sm text-gray-500">
                          {formatDate(item.startDate)} • {item.startTime} - {item.endTime}
                        </div>
                        <div className="text-sm mt-1">
                          <span className="font-medium">{item.vehicleType}:</span> {item.purpose}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{item.purpose}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-auto">
                      {getStatusBadge(item.status)}
                      <Button size="sm" variant="outline">Detail</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}