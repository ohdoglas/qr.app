-- CreateTable
CREATE TABLE "QRCode" (
    "id" UUID NOT NULL,
    "url" VARCHAR(255) NOT NULL,
    "imageUrl" VARCHAR(255),
    "base64" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "scanCount" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "QRCode_pkey" PRIMARY KEY ("id")
);
