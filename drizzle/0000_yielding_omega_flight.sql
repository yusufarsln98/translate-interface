CREATE TABLE `models` (
	`id` text PRIMARY KEY NOT NULL,
	`modelName` text,
	`modelUrl` text NOT NULL,
	`label` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `models_modelUrl_unique` ON `models` (`modelUrl`);--> statement-breakpoint
CREATE UNIQUE INDEX `models_label_unique` ON `models` (`label`);