/*
  Warnings:

  - You are about to drop the column `horario_fin` on the `local` table. All the data in the column will be lost.
  - You are about to drop the column `horario_ini` on the `local` table. All the data in the column will be lost.
  - You are about to drop the column `intervalo_horario` on the `local` table. All the data in the column will be lost.
  - You are about to drop the column `horario_reserva` on the `reserva` table. All the data in the column will be lost.
  - Added the required column `descricao` to the `local` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_fin` to the `reserva` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario_ini` to the `reserva` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_local" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL,
    CONSTRAINT "local_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "local_id_fkey" FOREIGN KEY ("id") REFERENCES "reserva" ("id_local") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_local" ("created_at", "deleted", "id", "id_usuario", "updated_at") SELECT "created_at", "deleted", "id", "id_usuario", "updated_at" FROM "local";
DROP TABLE "local";
ALTER TABLE "new_local" RENAME TO "local";
CREATE TABLE "new_reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "id_usuario" INTEGER NOT NULL,
    "id_local" INTEGER NOT NULL,
    "horario_ini" DATETIME NOT NULL,
    "horario_fin" DATETIME NOT NULL,
    "obs" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleted" BOOLEAN NOT NULL,
    CONSTRAINT "reserva_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_reserva" ("created_at", "deleted", "id", "id_local", "id_usuario", "obs", "updated_at") SELECT "created_at", "deleted", "id", "id_local", "id_usuario", "obs", "updated_at" FROM "reserva";
DROP TABLE "reserva";
ALTER TABLE "new_reserva" RENAME TO "reserva";
CREATE UNIQUE INDEX "reserva_id_local_key" ON "reserva"("id_local");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
