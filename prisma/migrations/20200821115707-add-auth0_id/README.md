# Migration `20200821115707-add-auth0_id`

This migration has been generated by Aaron Sinnott at 8/21/2020, 8:57:07 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER TABLE `readr`.`User` ADD COLUMN `auth0_id` varchar(191)  

CREATE UNIQUE INDEX `User.auth0_id_unique` ON `readr`.`User`(`auth0_id`)
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200819184107-create-user..20200821115707-add-auth0_id
--- datamodel.dml
+++ datamodel.dml
@@ -3,12 +3,13 @@
 }
 datasource db {
   provider = "mysql"
-  url = "***"
+  url = "***"
 }
 model User {
   id    Int     @id @default(autoincrement())
+  auth0_id String? @unique
   name  String?
   email String  @unique
 }
```

