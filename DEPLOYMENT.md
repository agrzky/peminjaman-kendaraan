# Deployment Guide - Peminjaman Kendaraan

## Pre-deployment Checklist

### 1. Environment Variables
Pastikan file `.env` berisi:
```bash
DATABASE_URL="postgresql://username:password@host:port/database"
DIRECT_URL="postgresql://username:password@host:port/database"
NODE_ENV="production"
```

### 2. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Test database connection
npm run test:db
```

### 3. Build Application
```bash
# Install dependencies
npm install

# Build for production
npm run build

# Start production server
npm run start
```

## Production Issues & Solutions

### Issue: Dashboard tidak terupdate realtime

#### Symptoms:
- Data tidak berubah setelah user mengajukan peminjaman
- Statistik dashboard tetap sama
- Tidak ada error yang terlihat

#### Root Causes:
1. **Browser Caching** - Browser menyimpan response API
2. **CDN Caching** - CDN cache response
3. **Database Connection** - Koneksi database tidak stabil
4. **API Route Issues** - Masalah dengan endpoint

#### Solutions Applied:

##### 1. Polling Mechanism
- Dashboard melakukan polling setiap 30 detik
- Manual refresh button
- Timestamp di URL untuk bypass cache

##### 2. Cache Control Headers
```javascript
// API routes mengirim header no-cache
response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate')
response.headers.set('Pragma', 'no-cache')
response.headers.set('Expires', '0')
```

##### 3. Next.js Configuration
```javascript
// next.config.mjs
async headers() {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Cache-Control', value: 'no-store, no-cache, must-revalidate' },
        { key: 'Pragma', value: 'no-cache' },
        { key: 'Expires', value: '0' },
      ],
    },
  ]
}
```

##### 4. Database Connection
- Connection pooling
- Error handling yang lebih baik
- Graceful shutdown

### Monitoring Tools

#### 1. Database Status Component
- Real-time status koneksi database
- Auto-refresh setiap 5 menit
- Visual indicator (green/red/yellow)

#### 2. Error Handling
- Loading states
- Error messages
- Retry mechanism

#### 3. Logging
- Console logs untuk debugging
- Database connection logs
- API response logs

## Troubleshooting Steps

### Step 1: Check Database Connection
```bash
npm run test:db
```

### Step 2: Check API Endpoint
```bash
curl -H "Cache-Control: no-cache" http://your-domain/api/peminjaman
```

### Step 3: Check Browser Console
- Open Developer Tools
- Check Network tab
- Look for API errors

### Step 4: Check Server Logs
```bash
# View application logs
tail -f /var/log/your-app/app.log

# Check for database errors
grep -i "database\|prisma\|error" /var/log/your-app/app.log
```

### Step 5: Restart Application
```bash
# Stop application
pm2 stop your-app

# Start application
pm2 start your-app

# Check status
pm2 status
```

## Performance Optimization

### 1. Database Indexing
```sql
-- Add indexes for better performance
CREATE INDEX idx_peminjaman_created_at ON peminjaman(created_at);
CREATE INDEX idx_peminjaman_status ON peminjaman(status);
```

### 2. Connection Pooling
```javascript
// lib/prisma.ts
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
})
```

### 3. Caching Strategy
- No caching untuk data yang sering berubah
- Implementasi cache invalidation
- Use timestamp untuk bypass cache

## Security Considerations

### 1. Environment Variables
- Never commit `.env` files
- Use secure environment variable management
- Rotate database credentials regularly

### 2. Database Security
- Use SSL connections
- Implement connection pooling
- Regular security updates

### 3. API Security
- Validate all inputs
- Implement rate limiting
- Use HTTPS in production

## Support

Jika masalah masih berlanjut:

1. **Collect Logs**
   - Application logs
   - Database logs
   - Browser console logs

2. **Environment Details**
   - Node.js version
   - Database version
   - Deployment platform

3. **Contact Support**
   - Sertakan error logs
   - Sertakan environment details
   - Jelaskan steps to reproduce 