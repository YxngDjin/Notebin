CREATE TABLE `command` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`title` text NOT NULL,
	`command` text NOT NULL,
	`language` text NOT NULL,
	`description` text,
	`tags` text,
	`is_pinned` integer DEFAULT false,
	`created_at` text DEFAULT (CURRENT_TIMESTAMP) NOT NULL,
	`slug` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `command_slug_unique` ON `command` (`slug`);--> statement-breakpoint
ALTER TABLE `snippet` ADD `description` text;--> statement-breakpoint
ALTER TABLE `snippet` ADD `tags` text;--> statement-breakpoint
ALTER TABLE `snippet` ADD `is_pinned` integer DEFAULT false;