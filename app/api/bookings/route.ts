import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Helper function untuk mendapatkan nama kendaraan yang benar
function getVehicleTypeText(type: string): string {
  switch (type) {
    case 'car':
      return 'Mobil';
    case 'motorcycle':
      return 'Motor';
    case 'pickup':
      return 'Pickup';
    case 'ambulance':
      return 'Ambulans';
    default:
      // Fallback untuk nilai yang tidak terduga, mengubah huruf pertama menjadi kapital
      return type.charAt(0).toUpperCase() + type.slice(1);
  }
}

async function sendWhatsAppNotification(data: any) {
  const { name, vehicleType, startDate, startTime, purpose } = data;

  // Menggunakan helper function untuk mendapatkan nama kendaraan
  const vehicleName = getVehicleTypeText(vehicleType);

  const message = `
*Pemberitahuan Peminjaman Baru*

Telah masuk pengajuan peminjaman kendaraan baru dengan detail sebagai berikut:

- *Nama:* ${name}
- *Kendaraan:* ${vehicleName}
- *Tanggal:* ${new Date(startDate).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })}
- *Waktu:* ${startTime}
- *Tujuan:* ${purpose}

Mohon untuk segera memeriksa dan menindaklanjuti pengajuan ini di dasbor admin.
Terima kasih.
  `.trim();

  const targetNumber = process.env.WHATSAPP_ADMIN_NUMBER;
  const apiToken = process.env.FONNTE_API_TOKEN;

  if (!targetNumber || !apiToken) {
    console.error("Variabel lingkungan WhatsApp tidak diatur.");
    return;
  }

  try {
    const response = await fetch('https://api.fonnte.com/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiToken
      },
      body: JSON.stringify({
        target: targetNumber,
        message: message,
        countryCode: '62',
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gagal mengirim notifikasi via Fonnte: ${JSON.stringify(errorData)}`);
    }
    
    await response.json();

  } catch (error) {
    console.error("Terjadi kesalahan saat mengirim notifikasi WhatsApp:", error);
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

    const peminjaman = await prisma.peminjaman.create({
      data: {
        nama: name,
        handphone: phoneNumber,
        vehicleType,
        driver: driverId,
        startDate: new Date(startDate),
        startTime,
        endDate: new Date(endDate),
        endTime,
        purpose
      }
    })

    sendWhatsAppNotification({ name, vehicleType, startDate, startTime, purpose });

    return NextResponse.json(peminjaman)
  } catch (error) {
    console.error('Error saat membuat peminjaman:', error)
    return NextResponse.json(
      { error: 'Gagal membuat data peminjaman' },
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