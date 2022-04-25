-- CreateEnum
CREATE TYPE "Status" AS ENUM ('OPEN', 'IN_PROGRESS', 'DONE');

-- CreateTable
CREATE TABLE "task" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "status" "Status" NOT NULL DEFAULT E'OPEN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "task_pkey" PRIMARY KEY ("id")
);
