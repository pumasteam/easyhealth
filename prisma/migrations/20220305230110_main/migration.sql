/*
  Warnings:

  - Added the required column `patient` to the `Consultation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Consultation" DROP CONSTRAINT "Consultation_id_fkey";

-- AlterTable
ALTER TABLE "Consultation" ADD COLUMN     "patient" TEXT NOT NULL;
