/*
  Warnings:

  - Added the required column `statType` to the `Statistics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Statistics` ADD COLUMN `statType` ENUM('MONTHLY', 'GENRE', 'YEARLY', 'STATUS') NOT NULL;
