/*
  Warnings:

  - You are about to drop the column `fileContentId` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Response` table. All the data in the column will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `answer` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `question` to the `Response` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Response` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "FileContent" DROP CONSTRAINT "FileContent_responseId_fkey";

-- DropForeignKey
ALTER TABLE "Projects" DROP CONSTRAINT "Projects_userId_fkey";

-- AlterTable
ALTER TABLE "Projects" ADD COLUMN     "languages" TEXT[],
ADD COLUMN     "stars" INTEGER;

-- AlterTable
ALTER TABLE "Response" DROP COLUMN "fileContentId",
DROP COLUMN "type",
ADD COLUMN     "answer" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "projectId" TEXT NOT NULL,
ADD COLUMN     "question" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "User";

-- AddForeignKey
ALTER TABLE "Response" ADD CONSTRAINT "Response_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Projects"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FileContent" ADD CONSTRAINT "FileContent_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "Response"("id") ON DELETE CASCADE ON UPDATE CASCADE;
