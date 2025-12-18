-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'AUTHOR', 'READER');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Studies" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "thumbnail_id" TEXT NOT NULL,
    "thumbnail_url" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "reading_time" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "author_id" TEXT NOT NULL,

    CONSTRAINT "Studies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Studies_slug_key" ON "Studies"("slug");

-- AddForeignKey
ALTER TABLE "Studies" ADD CONSTRAINT "Studies_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
