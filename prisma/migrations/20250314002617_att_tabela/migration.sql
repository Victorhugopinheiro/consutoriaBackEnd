/*
  Warnings:

  - You are about to drop the column `data` on the `subscriptions` table. All the data in the column will be lost.
  - You are about to drop the column `plano` on the `subscriptions` table. All the data in the column will be lost.
  - Added the required column `priceId` to the `subscriptions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `subscriptions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "subscriptions" DROP COLUMN "data",
DROP COLUMN "plano",
ADD COLUMN     "priceId" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
