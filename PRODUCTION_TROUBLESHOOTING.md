# Troubleshooting Production Issues

## Masalah: Dashboard tidak terupdate secara realtime

### Penyebab Umum:
1. **Caching Issues** - Browser atau CDN cache
2. **Database Connection** - Koneksi database tidak stabil
3. **Environment Variables** - Konfigurasi database tidak benar
4. **API Routes** - Masalah dengan API endpoints

### Solusi yang Sudah Diterapkan:

#### 1. Polling Mechanism
- Dashboard sekarang melakukan polling setiap 30 detik
- Manual refresh button ditambahkan
- Timestamp ditambahkan ke URL untuk menghindari cache

#### 2. Cache Control Headers
- API routes sekarang mengirim header no-cache
- Next.js config menambahkan cache control untuk semua API routes

#### 3. Database Connection
- Prisma client diperbaiki dengan connection pooling
- Error handling yang lebih baik
- Graceful shutdown

#### 4. Error Handling
- Loading states yang lebih baik
- Error messages yang informatif
- Retry mechanism

### Checklist untuk Production:

#### Environment Variables
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_URL="postgresql://username:password@host:port/database"
NODE_ENV="production"
```

#### Database Connection
- Pastikan database dapat diakses dari server production
- Periksa firewall settings
- Pastikan connection pooling dikonfigurasi dengan benar

#### Build dan Deploy
```bash
npm run build
npm run start
```

#### Monitoring
- Periksa server logs untuk error database
- Monitor API response times
- Periksa browser console untuk error

### Debugging Steps:

1. **Periksa Browser Console**
   - Buka Developer Tools
   - Lihat Network tab untuk API calls
   - Periksa Console untuk error

2. **Periksa Server Logs**
   - Lihat log aplikasi
   - Periksa database connection logs

3. **Test API Endpoint**
   - Coba akses `/api/peminjaman` langsung
   - Periksa response headers

4. **Database Connection Test**
   - Test koneksi database dari server
   - Periksa apakah data ada di database

### Jika Masalah Masih Berlanjut:

1. **Restart Application**
   ```bash
   npm run build
   npm run start
   ```

2. **Clear Browser Cache**
   - Hard refresh (Ctrl+F5)
   - Clear browser cache

3. **Check Database**
   - Pastikan data ada di database
   - Periksa permissions

4. **Contact Support**
   - Sertakan error logs
   - Sertakan environment details 