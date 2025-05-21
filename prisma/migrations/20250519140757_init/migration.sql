-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'staff', 'participant');

-- CreateEnum
CREATE TYPE "BorrowStatus" AS ENUM ('pending', 'approved', 'rejected', 'in_use');

-- CreateEnum
CREATE TYPE "VehicleType" AS ENUM ('car', 'motorcycle', 'pickup', 'ambulance');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" "UserRole" NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "peminjaman" (
    "id" SERIAL NOT NULL,
    "nama" VARCHAR(255) NOT NULL,
    "handphone" VARCHAR(20),
    "vehicleType" "VehicleType" NOT NULL,
    "driver" VARCHAR(255),
    "startDate" DATE NOT NULL,
    "startTime" TIME(0) NOT NULL,
    "endDate" DATE NOT NULL,
    "endTime" TIME(0) NOT NULL,
    "purpose" TEXT,
    "status" "BorrowStatus" NOT NULL DEFAULT 'pending',
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "peminjaman_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
