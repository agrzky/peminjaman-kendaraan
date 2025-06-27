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
  Car,
  Bike,
  Truck,
  Ambulance,
  LogOut,
  ChevronDown,
  User,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

// Tambahkan tipe untuk data peminjaman
interface Peminjaman {
  id: number;
  nama: string;
  handphone?: string;
  vehicleType: string;
  driver?: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  purpose?: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminDashboard() {
  const [activeNav, setActiveNav] = useState("dashboard")
  const [peminjaman, setPeminjaman] = useState<Peminjaman[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
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
      }
    }
    fetchPeminjaman()
  }, [])

  // Statistik
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

  // Handle logout
  const handleLogout = () => {
    // In a real app, you would clear authentication state here
    router.push("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 flex">
      {/* Sidebar Desktop */}
      <div className="hidden md:block w-64 border-r border-gray-200 min-h-screen p-4">
        <div className="flex items-center gap-3 mb-6">
          <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
            <Settings className="h-5 w-5 text-white" />
          </div>
          <h1 className="text-xl font-bold">Pusbangpeg ASN</h1>
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
          <>
            <div className="flex items-center gap-3 mb-6 p-4 border-b">
              <div className="h-10 w-10 rounded-full bg-purple-600 flex items-center justify-center">
                <Settings className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold">Pusbangpeg ASN</h1>
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
          </>
        </SheetContent>
      </Sheet>
      {/* Main content */}
      <div className="flex-1 p-4 md:p-6">
        <div className="flex justify-end mb-4">
          <Button variant="ghost" onClick={handleLogout} className="p-2 rounded-full hover:bg-gray-100">
            <User className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <h1 className="text-xl md:text-2xl font-bold mb-6">Dashboard Peminjaman Kendaraan</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-8">
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-500">Total Peminjaman</div>
                <div className="text-2xl md:text-3xl font-bold mt-1">{totalPeminjaman}</div>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 md:h-6 md:w-6 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-500">Menunggu Persetujuan</div>
                <div className="text-2xl md:text-3xl font-bold mt-1">{menungguPersetujuan}</div>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Clock className="h-5 w-5 md:h-6 md:w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-4 md:p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-xs md:text-sm font-medium text-gray-500">Disetujui Hari Ini</div>
                <div className="text-2xl md:text-3xl font-bold mt-1">{disetujuiHariIni}</div>
              </div>
              <div className="h-10 w-10 md:h-12 md:w-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
