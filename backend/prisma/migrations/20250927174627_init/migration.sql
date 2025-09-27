-- AlterTable
ALTER TABLE "public"."User" ADD COLUMN     "password" TEXT,
ADD COLUMN     "provider" TEXT NOT NULL DEFAULT 'local',
ADD COLUMN     "providerId" TEXT;
