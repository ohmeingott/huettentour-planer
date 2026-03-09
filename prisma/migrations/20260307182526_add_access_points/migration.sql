-- CreateEnum
CREATE TYPE "AccessPointType" AS ENUM ('parking', 'village', 'cable_car');

-- CreateTable
CREATE TABLE "AccessPoint" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "AccessPointType" NOT NULL,
    "altitude" INTEGER NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,
    "lng" DOUBLE PRECISION NOT NULL,
    "regionId" TEXT NOT NULL,

    CONSTRAINT "AccessPoint_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CableCar" (
    "id" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,
    "operatorName" TEXT NOT NULL,
    "seasonStart" TEXT,
    "seasonEnd" TEXT,
    "website" TEXT,

    CONSTRAINT "CableCar_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AccessRoute" (
    "id" TEXT NOT NULL,
    "accessPointId" TEXT NOT NULL,
    "hutId" TEXT NOT NULL,
    "distance" DOUBLE PRECISION NOT NULL,
    "ascent" INTEGER NOT NULL,
    "descent" INTEGER NOT NULL,
    "estimatedDuration" DOUBLE PRECISION NOT NULL,
    "difficulty" "Difficulty" NOT NULL,
    "hasCableCar" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "AccessRoute_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CableCar_accessPointId_key" ON "CableCar"("accessPointId");

-- CreateIndex
CREATE UNIQUE INDEX "AccessRoute_accessPointId_hutId_key" ON "AccessRoute"("accessPointId", "hutId");

-- AddForeignKey
ALTER TABLE "AccessPoint" ADD CONSTRAINT "AccessPoint_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CableCar" ADD CONSTRAINT "CableCar_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "AccessPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRoute" ADD CONSTRAINT "AccessRoute_accessPointId_fkey" FOREIGN KEY ("accessPointId") REFERENCES "AccessPoint"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AccessRoute" ADD CONSTRAINT "AccessRoute_hutId_fkey" FOREIGN KEY ("hutId") REFERENCES "Hut"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
