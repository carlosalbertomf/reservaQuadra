-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_reserva" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "hora_ini" DATETIME NOT NULL,
    "hora_fim" DATETIME NOT NULL,
    "usuario_id" INTEGER NOT NULL,
    "local_id" INTEGER NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "reserva_usuario_id_fkey" FOREIGN KEY ("usuario_id") REFERENCES "usuario" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "reserva_local_id_fkey" FOREIGN KEY ("local_id") REFERENCES "local" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_reserva" ("created_at", "hora_fim", "hora_ini", "id", "local_id", "updated_at", "usuario_id") SELECT "created_at", "hora_fim", "hora_ini", "id", "local_id", "updated_at", "usuario_id" FROM "reserva";
DROP TABLE "reserva";
ALTER TABLE "new_reserva" RENAME TO "reserva";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
