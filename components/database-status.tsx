"use client"

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Database, Wifi, WifiOff } from 'lucide-react'

export function DatabaseStatus() {
  const [status, setStatus] = useState<'checking' | 'connected' | 'disconnected'>('checking')
  const [lastCheck, setLastCheck] = useState<Date | null>(null)

  const checkDatabaseStatus = async () => {
    try {
      setStatus('checking')
      const response = await fetch('/api/peminjaman?t=' + Date.now(), {
        method: 'GET',
        headers: {
          'Cache-Control': 'no-cache',
        },
      })
      
      if (response.ok) {
        setStatus('connected')
      } else {
        setStatus('disconnected')
      }
      setLastCheck(new Date())
    } catch (error) {
      console.error('Database status check failed:', error)
      setStatus('disconnected')
      setLastCheck(new Date())
    }
  }

  useEffect(() => {
    checkDatabaseStatus()
    
    // Check every 5 minutes
    const interval = setInterval(checkDatabaseStatus, 5 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [])

  const getStatusColor = () => {
    switch (status) {
      case 'connected':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'disconnected':
        return 'bg-red-100 text-red-800 border-red-200'
      case 'checking':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const getStatusIcon = () => {
    switch (status) {
      case 'connected':
        return <Wifi className="h-3 w-3" />
      case 'disconnected':
        return <WifiOff className="h-3 w-3" />
      case 'checking':
        return <Database className="h-3 w-3 animate-pulse" />
      default:
        return <Database className="h-3 w-3" />
    }
  }

  const getStatusText = () => {
    switch (status) {
      case 'connected':
        return 'Database Terhubung'
      case 'disconnected':
        return 'Database Terputus'
      case 'checking':
        return 'Memeriksa Koneksi...'
      default:
        return 'Status Tidak Diketahui'
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Badge 
        variant="outline" 
        className={`text-xs flex items-center gap-1 ${getStatusColor()}`}
      >
        {getStatusIcon()}
        {getStatusText()}
      </Badge>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={checkDatabaseStatus}
        disabled={status === 'checking'}
        className="h-6 px-2 text-xs"
      >
        Refresh
      </Button>
      
      {lastCheck && (
        <span className="text-xs text-gray-500">
          Terakhir: {lastCheck.toLocaleTimeString('id-ID')}
        </span>
      )}
    </div>
  )
} 