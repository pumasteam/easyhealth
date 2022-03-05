/*
  Warnings:

  - You are about to drop the `Diagnosis` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Diagnosis";

-- CreateTable
CREATE TABLE "Patient" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "sex" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "nlp" TEXT NOT NULL,
    "content" TEXT NOT NULL,

    CONSTRAINT "Patient_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultation" (
    "id" TEXT NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Consultation_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Consultation" ADD CONSTRAINT "Consultation_id_fkey" FOREIGN KEY ("id") REFERENCES "Patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
