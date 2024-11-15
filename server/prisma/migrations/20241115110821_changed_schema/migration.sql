/*
  Warnings:

  - You are about to drop the column `accountNumber` on the `BankDetails` table. All the data in the column will be lost.
  - You are about to drop the column `panchayath` on the `Farmer` table. All the data in the column will be lost.
  - You are about to drop the column `photoUrl` on the `Farmer` table. All the data in the column will be lost.
  - You are about to drop the column `geoLocation` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the `Document` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `address` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `bankCode` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `branchName` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `BankDetails` table without a default value. This is not possible if the table is not empty.
  - Added the required column `panchayat` to the `Farmer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `geoTag` to the `Field` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Field` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Document" DROP CONSTRAINT "Document_farmerId_fkey";

-- AlterTable
ALTER TABLE "BankDetails" DROP COLUMN "accountNumber",
ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "bankCode" TEXT NOT NULL,
ADD COLUMN     "branchName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Farmer" DROP COLUMN "panchayath",
DROP COLUMN "photoUrl",
ADD COLUMN     "aadharDocument" TEXT,
ADD COLUMN     "bankDocument" TEXT,
ADD COLUMN     "landDocument" TEXT,
ADD COLUMN     "panchayat" TEXT NOT NULL,
ADD COLUMN     "photo" TEXT;

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "geoLocation",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "geoTag" JSONB NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "Document";

-- DropEnum
DROP TYPE "DocumentType";

-- CreateIndex
CREATE INDEX "Field_farmerId_idx" ON "Field"("farmerId");
