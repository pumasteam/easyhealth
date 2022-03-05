/*
  Warnings:

  - Made the column `notes` on table `Consultation` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Consultation" ALTER COLUMN "notes" SET NOT NULL,
ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;
