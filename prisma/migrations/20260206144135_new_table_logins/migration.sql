-- CreateTable
CREATE TABLE "logins" (
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "logins_pkey" PRIMARY KEY ("email")
);
