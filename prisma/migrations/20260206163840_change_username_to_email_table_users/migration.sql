/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "username",
ADD COLUMN     "email" TEXT NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("email");
