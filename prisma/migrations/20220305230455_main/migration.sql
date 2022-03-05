/*
  Warnings:

  - You are about to drop the column `patient` on the `Consultation` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Consultation" DROP COLUMN "patient",
ADD COLUMN     "patientId" TEXT;
