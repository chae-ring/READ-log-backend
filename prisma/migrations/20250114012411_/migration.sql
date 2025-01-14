/*
  Warnings:

  - You are about to drop the column `calculated_at` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Statistics` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Statistics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Statistics` DROP COLUMN `calculated_at`,
    DROP COLUMN `type`,
    DROP COLUMN `value`,
    ADD COLUMN `count` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `genre` ENUM('NOVEL', 'NONFICTION', 'SELFHELP', 'FANTASY', 'MYSTERY') NULL,
    ADD COLUMN `month` INTEGER NULL,
    ADD COLUMN `status` ENUM('READING', 'COMPLETED', 'ABANDONED') NULL,
    ADD COLUMN `year` INTEGER NULL;
