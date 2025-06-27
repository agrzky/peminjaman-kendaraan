"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Search,
  Bell,
  HelpCircle,
  Settings,
  Home,
  FileText,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  Car,
  Bike,
  Truck,
  Ambulance,
  LogOut,
  ChevronDown,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { prisma } from "@/lib/prisma"
export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [peminjaman, setPeminjaman] = useState([])
  const router = useRouter()

  useEffect(() => {
    const fetchPeminjaman = async () => {
      try {
        const response = await fetch('/api/peminjaman')
        const data = await response.json()
        setPeminjaman(data)
      } catch (error) {
        console.error('Error fetching peminjaman:', error)
      }
    }

    fetchPeminjaman()
  }, [])

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    router.push("/login")
  }

  // Sample data for pending requests
  const pendingRequests = [
    {
      id: 1,
      peminjam: "Ahmad Fauzi",
      tanggal: "18 Mei 2025",
      waktu: "08:00 - 16:00",
      kendaraan: "Mobil",
      model: "Toyota Avanza",
      tujuan: "Kunjungan Dinas ke Kantor Regional III BKN Bandung",
      status: "pending",
    },
    {
      id: 2,
      peminjam: "Siti Nurhaliza",
      tanggal: "19 Mei 2025",
      waktu: "09:00 - 14:00",
      kendaraan: "Motor",
      model: "Honda PCX",
      tujuan: "Pengantaran Dokumen ke Kantor Pusat BKN",
      status: "pending",
    },
    {
      id: 3,
      peminjam: "Budi Santoso",
      tanggal: "20 Mei 2025",
      waktu: "07:30 - 17:00",
      kendaraan: "Elf",
      model: "Isuzu Elf",
      tujuan: "Antar Jemput Pegawai untuk Pelatihan di Bogor",
      status: "pending",
    },
  ]

  // Sample data for recent activities
  const recentActivities = [
    {
      id: 1,
      peminjam: "Dian Sastro",
      tanggal: "17 Mei 2025",
      waktu: "08:00 - 12:00",
      kendaraan: "Mobil",
      model: "Honda Brio",
      tujuan: "Rapat Koordinasi di Kementerian PAN-RB",
      status: "approved",
    },
    {
      id: 2,
      peminjam: "Rudi Hartono",
      tanggal: "16 Mei 2025",
      waktu: "13:00 - 16:00",
      kendaraan: "Ambulance",
      model: "Toyota Hiace",
      tujuan: "Pengantaran Pegawai Sakit ke Rumah Sakit",
      status: "approved",
    },
    {
      id: 3,
      peminjam: "Eko Prasetyo",
      tanggal: "15 Mei 2025",
      waktu: "09:00 - 11:00",
      kendaraan: "Pickup",
      model: "Mitsubishi L300",
      tujuan: "Pengangkutan Barang Inventaris Kantor",
      status: "rejected",
    },
  ]

  // Function to get icon based on vehicle type
  const getVehicleIcon = (type: string) => {
    switch (type) {
      case "Mobil":
        return <Car className="h-5 w-5" />
      case "Motor":
        return <Bike className="h-5 w-5" />
      case "Elf":
      case "Pickup":
        return <Truck className="h-5 w-5" />
      case "Ambulance":
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

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="flex">
            {/* Sidebar */}
            <div className="w-64 border-r border-gray-200 min-h-screen">
              <div className="p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-white" />
                  </div>
                  <h1 className="text-xl font-bold">Pusbangpeg ASN</h1>
                </div>

                <nav className="space-y-1">
                  <NavItem
                    icon={<Home className="h-5 w-5" />}
                    label="Dashboard"
                    active={activeNav === "dashboard"}
                    onClick={() => setActiveNav("dashboard")}
                  />
                  <NavItem
                    icon={<Calendar className="h-5 w-5" />}
                    label="Peminjaman"
                    active={activeNav === "peminjaman"}
                    onClick={() => setActiveNav("peminjaman")}
                  />
                  <NavItem
                    icon={<FileText className="h-5 w-5" />}
                    label="Laporan"
                    active={activeNav === "laporan"}
                    onClick={() => setActiveNav("laporan")}
                  />
                </nav>

                {/* Logout button for mobile */}
                <div className="mt-8 pt-4 border-t border-gray-200 md:hidden">
                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </Button>
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1">
              {/* Header */}
              <header className="border-b border-gray-200 p-4">
                <div className="flex items-center justify-between">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input placeholder="Cari peminjaman..." className="pl-10 w-80 border-gray-300" />
                  </div>
                  <div className="flex items-center gap-4">
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <Bell className="h-5 w-5 text-gray-500" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-gray-100">
                      <HelpCircle className="h-5 w-5 text-gray-500" />
                    </button>

                    {/* Profile dropdown with logout */}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <button className="flex items-center gap-2 rounded-lg p-1 hover:bg-gray-100 transition-colors">
                          <Avatar>
                            <AvatarImage src="/placeholder.svg?height=32&width=32" />
                            <AvatarFallback>AD</AvatarFallback>
                          </Avatar>
                          <div className="hidden sm:block text-left">
                            <div className="font-medium">Admin Pusbang</div>
                            <div className="text-xs text-gray-500">Administrator</div>
                          </div>
                          <ChevronDown className="h-4 w-4 text-gray-500 hidden sm:block" />
                        </button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-56">
                        <div className="flex items-center gap-2 p-2 sm:hidden">
                          <div className="font-medium">Admin Pusbang</div>
                          <div className="text-xs text-gray-500">Administrator</div>
                        </div>
                        <DropdownMenuSeparator className="sm:hidden" />
                        <DropdownMenuItem asChild>
                          <Link href="/profile" className="cursor-pointer">
                            Profil
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href="/settings" className="cursor-pointer">
                            Pengaturan
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:text-red-600 cursor-pointer"
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </header>

              {/* Content */}
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-6">Dashboard Peminjaman Kendaraan</h1>

                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Total Peminjaman</div>
                        <div className="text-3xl font-bold mt-1">24</div>
                      </div>
                      <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <Calendar className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Menunggu Persetujuan</div>
                        <div className="text-3xl font-bold mt-1">3</div>
                      </div>
                      <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-yellow-600" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-sm font-medium text-gray-500">Disetujui Hari Ini</div>
                        <div className="text-3xl font-bold mt-1">5</div>
                      </div>
                      <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                        <CheckCircle className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tabs for Pending and Recent */}
                <Tabs defaultValue="pending" className="w-full">
                  <div className="flex items-center justify-between mb-4">
                    <TabsList>
                      <TabsTrigger value="pending">Menunggu Persetujuan</TabsTrigger>
                      <TabsTrigger value="recent">Aktivitas Terbaru</TabsTrigger>
                    </TabsList>
                    <Button variant="outline" className="flex items-center gap-2">
                      <Filter className="h-4 w-4" /> Filter
                    </Button>
                  </div>

                  <TabsContent value="pending">
                    <div className="space-y-4">
                      {pendingRequests.map((request) => (
                        <div
                          key={request.id}
                          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                                {getVehicleIcon(request.kendaraan)}
                              </div>
                              <div>
                                <div className="font-medium">{request.peminjam}</div>
                                <div className="text-sm text-gray-500">
                                  {request.tanggal} • {request.waktu}
                                </div>
                                <div className="text-sm mt-1">
                                  <span className="font-medium">{request.kendaraan}:</span> {request.model}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">{request.tujuan}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                              {getStatusBadge(request.status)}
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                  Tolak
                                </Button>
                                <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                                  Setujui
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="recent">
                    <div className="space-y-4">
                      {recentActivities.map((activity) => (
                        <div
                          key={activity.id}
                          className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                            <div className="flex items-start gap-3">
                              <div className="h-10 w-10 bg-purple-100 rounded-full flex items-center justify-center mt-1">
                                {getVehicleIcon(activity.kendaraan)}
                              </div>
                              <div>
                                <div className="font-medium">{activity.peminjam}</div>
                                <div className="text-sm text-gray-500">
                                  {activity.tanggal} • {activity.waktu}
                                </div>
                                <div className="text-sm mt-1">
                                  <span className="font-medium">{activity.kendaraan}:</span> {activity.model}
                                </div>
                                <div className="text-sm text-gray-600 mt-1">{activity.tujuan}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 ml-auto">
                              {getStatusBadge(activity.status)}
                              <Button size="sm" variant="outline">
                                Detail
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Navigation item component
function NavItem({
  icon,
  label,
  active,
  onClick,
}: {
  icon: React.ReactNode
  label: string
  active: boolean
  onClick: () => void
}) {
  return (
    <button
      className={`flex items-center w-full px-3 py-2 rounded-lg text-left ${
        active ? "bg-purple-100 text-purple-600" : "text-gray-700 hover:bg-gray-100"
      }`}
      onClick={onClick}
    >
      <span className={`mr-3 ${active ? "text-purple-600" : "text-gray-500"}`}>{icon}</span>
      <span className="font-medium">{label}</span>
      {active && <div className="ml-auto w-1.5 h-5 bg-purple-600 rounded-full"></div>}
    </button>
  )
}
