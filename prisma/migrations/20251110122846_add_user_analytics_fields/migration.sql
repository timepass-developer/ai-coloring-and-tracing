-- CreateEnum
CREATE TYPE "ActivityType" AS ENUM ('COLORING', 'TRACING');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "coloringCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "totalSessionHours" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "tracingCount" INTEGER NOT NULL DEFAULT 0;

-- CreateTable
CREATE TABLE "Activity" (
    "id" TEXT NOT NULL,
    "type" "ActivityType" NOT NULL,
    "prompt" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
