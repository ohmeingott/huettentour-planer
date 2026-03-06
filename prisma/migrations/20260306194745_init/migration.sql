-- CreateEnum
CREATE TYPE "BookingSystem" AS ENUM ('alpsonline', 'hut_wrs', 'sac', 'custom');

-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('easy', 'moderate', 'difficult');

-- CreateEnum
CREATE TYPE "RoomType" AS ENUM ('single', 'double', 'shared_4', 'dorm');

-- CreateEnum
CREATE TYPE "TourStatus" AS ENUM ('draft', 'checking', 'available', 'partially_available');

-- CreateEnum
CREATE TYPE "AccommodationType" AS ENUM ('any', 'private_room', 'shared_room', 'dorm');

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "boundingBoxMinLat" DOUBLE PRECISION NOT NULL,
    "boundingBoxMinLng" DOUBLE PRECISION NOT NULL,
    "boundingBoxMaxLat" DOUBLE PRECISION NOT NULL,
    "boundingBoxMaxLng" DOUBLE PRECISION NOT NULL,
    "centerLat" DOUBLE PRECISION NOT NULL,
    "centerLng" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hut" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "altitude" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "capacity" INTEGER NOT NULL,
    "bookingUrl" TEXT,
    "bookingSystem" "BookingSystem" NOT NULL DEFAULT 'custom',
    "imageUrl" TEXT,
    "description" TEXT,
    "amenities" TEXT[],
    "regionId" TEXT NOT NULL,

    CONSTRAINT "Hut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomTypeConfig" (
    "id" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "type" "RoomType" NOT NULL,
    "count" INTEGER NOT NULL,

    CONSTRAINT "RoomTypeConfig_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "fromHutId" TEXT NOT NULL,
    "toHutId" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "ascent" INTEGER NOT NULL,
    "descent" INTEGER NOT NULL,
    "estimatedDuration" DOUBLE PRECISION NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "gpxTrack" JSONB,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "groupSize" INTEGER NOT NULL,
    "totalDays" INTEGER NOT NULL,
    "restDays" INTEGER NOT NULL DEFAULT 0,
    "accommodationType" "AccommodationType" NOT NULL DEFAULT 'any',
    "maxBedsPerRoom" INTEGER,
    "minDistancePerDay" DOUBLE PRECISION,
    "maxDistancePerDay" DOUBLE PRECISION,
    "maxAscentPerDay" INTEGER,
    "dateRangeStart" TIMESTAMP(3),
    "dateRangeEnd" TIMESTAMP(3),
    "status" "TourStatus" NOT NULL DEFAULT 'draft',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Tour_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TourHut" (
    "id" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "dayNumber" INTEGER NOT NULL,

    CONSTRAINT "TourHut_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AvailabilityCheck" (
    "id" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "roomType" "RoomType" NOT NULL,
    "available" INTEGER NOT NULL,
    "checkedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "source" "BookingSystem" NOT NULL,

    CONSTRAINT "AvailabilityCheck_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Region_slug_key" ON "Region"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RoomTypeConfig_hutId_type_key" ON "RoomTypeConfig"("hutId", "type");

-- CreateIndex
CREATE UNIQUE INDEX "Route_fromHutId_toHutId_key" ON "Route"("fromHutId", "toHutId");

-- CreateIndex
CREATE UNIQUE INDEX "TourHut_tourId_dayNumber_key" ON "TourHut"("tourId", "dayNumber");

-- CreateIndex
CREATE UNIQUE INDEX "AvailabilityCheck_hutId_date_roomType_key" ON "AvailabilityCheck"("hutId", "date", "roomType");

-- AddForeignKey
ALTER TABLE "Hut" ADD CONSTRAINT "Hut_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomTypeConfig" ADD CONSTRAINT "RoomTypeConfig_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_fromHutId_fkey" FOREIGN KEY ("fromHutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_toHutId_fkey" FOREIGN KEY ("toHutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourHut" ADD CONSTRAINT "TourHut_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TourHut" ADD CONSTRAINT "TourHut_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AvailabilityCheck" ADD CONSTRAINT "AvailabilityCheck_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
