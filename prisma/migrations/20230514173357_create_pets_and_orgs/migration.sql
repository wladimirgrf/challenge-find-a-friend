-- CreateEnum
CREATE TYPE "EnergyLevel" AS ENUM ('SMALL', 'REASONABLE', 'ENERGETIC', 'HIGH', 'EXTREME');

-- CreateEnum
CREATE TYPE "Size" AS ENUM ('TINY', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "Age" AS ENUM ('PUPPY', 'ADULT');

-- CreateTable
CREATE TABLE "pets" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "about" TEXT NOT NULL,
    "requirements" TEXT[],
    "images" TEXT[],
    "size" "Size" NOT NULL,
    "age" "Age" NOT NULL,
    "energy_level" "EnergyLevel" NOT NULL,
    "org_id" TEXT NOT NULL,

    CONSTRAINT "pets_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orgs" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "responsible_name" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "whatsapp" TEXT NOT NULL,
    "latitude" DECIMAL(65,30) NOT NULL,
    "longitude" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "orgs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "orgs_email_key" ON "orgs"("email");

-- AddForeignKey
ALTER TABLE "pets" ADD CONSTRAINT "pets_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "orgs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
