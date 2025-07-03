import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

/**
 * Mengirim notifikasi WhatsApp menggunakan API Fonnte.
 * @param data - Objek yang berisi detail peminjaman.
 */
async function sendWhatsAppNotification(data: any) {
  const { name, vehicleType, startDate, startTime, purpose } = data;

  // Format pesan notifikasi
  const message = `
*Pemberitahuan Peminjaman Baru*

Telah masuk pengajuan peminjaman kendaraan baru dengan detail sebagai berikut:

- *Nama:* ${name}
- *Kendaraan:* ${vehicleType === 'motorcycle' ? 'Motor' : vehicleType.charAt(0).toUpperCase() + vehicleType.slice(1)}
- *Tanggal:* ${new Date(startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
- *Waktu:* ${startTime}
- *Tujuan:* ${purpose}

Mohon untuk segera memeriksa dan menindaklanjuti pengajuan ini di dasbor admin.
Terima kasih.
  `.trim();

  const targetNumber = process.env.WHATSAPP_ADMIN_NUMBER;
  const apiToken = process.env.FONNTE_API_TOKEN;

  if (!targetNumber || !apiToken) {
    console.error("Variabel lingkungan FONNTE_API_TOKEN atau WHATSAPP_ADMIN_NUMBER tidak diatur.");
    return; // Keluar dari fungsi jika konfigurasi tidak ada
  }

  try {
    // Mengirim request ke API Fonnte
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken // Sesuai dokumentasi Fonnte
      },
      body: JSON.stringify({
        target: targetNumber,
        message: message,
        countryCode: '62', // Opsional, untuk memastikan format nomor benar
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gagal mengirim notifikasi via Fonnte: ${JSON.stringify(errorData)}`);
    }
    
    const result = await response.json();
    console.log("Notifikasi WhatsApp berhasil dikirim:", result);

  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim notifikasi WhatsApp:", error);
    // Proses utama tetap berjalan meskipun notifikasi gagal
  }
}

export const dynamic = 'force-dynamic'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const {
      name,
      phoneNumber,
      vehicleType,
      driverId,
      startDate,
      startTime,
      endDate,
      endTime,
      purpose
    } = body

    // Create peminjaman
    const peminjaman = await prisma.peminjaman.create({
      data: {
        nama: name,
        handphone: phoneNumber,
        vehicleType,
        driver: driverId,
        startDate: new Date(startDate),
        startTime: startTime,
        endDate: new Date(endDate),
        endTime: endTime,
        purpose
      }
    })

    // Kirim notifikasi WhatsApp
    sendWhatsAppNotification({ name, vehicleType, startDate, startTime, purpose });

    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error creating peminjaman:', error)
    return NextResponse.json(
      { error: 'Gagal membuat peminjaman' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const peminjaman = await prisma.peminjaman.findMany()
    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error fetching peminjaman:', error)
    return NextResponse.json(
      { error: 'Error fetching peminjaman' },
      { status: 500 }
    )
  }
}