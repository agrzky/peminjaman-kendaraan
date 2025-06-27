"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, CheckCircle } from "lucide-react"

export default function PeminjamanPage() {
  const [peminjaman, setPeminjaman] = useState([])

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

  // Get statistics
  const totalPeminjaman = peminjaman.length
  const menungguPersetujuan = peminjaman.filter((item: any) => item.status === 'pending').length
  const disetujuiHariIni = peminjaman.filter((item: any) => {
    const today = new Date()
    const itemDate = new Date(item.startDate)
    return item.status === 'approved' && 
           itemDate.getDate() === today.getDate() &&
           itemDate.getMonth() === today.getMonth() &&
           itemDate.getFullYear() === today.getFullYear()
  }).length

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
      <div className="container mx-auto p-4">
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Total Peminjaman</h3>
                <p className="text-3xl font-bold">{totalPeminjaman}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Menunggu Persetujuan</h3>
                <p className="text-3xl font-bold">{menungguPersetujuan}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="bg-white rounded-lg shadow p-4 flex justify-between items-center">
              <div>
                <h3 className="text-gray-500 text-sm font-medium">Disetujui Hari Ini</h3>
                <p className="text-3xl font-bold">{disetujuiHariIni}</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}