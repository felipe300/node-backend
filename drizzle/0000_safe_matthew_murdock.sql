CREATE TABLE `task` (
	`id` text(36) PRIMARY KEY NOT NULL,
	`titulo` text NOT NULL,
	`descripcion` text NOT NULL,
	`status` text DEFAULT 'pendiente',
	`fechaCreacion` text DEFAULT (current_timestamp) NOT NULL,
	`fechaActualizacion` text DEFAULT (current_timestamp) NOT NULL
);
--> statement-breakpoint
CREATE INDEX `title_idx` ON `task` (`titulo`);--> statement-breakpoint
CREATE INDEX `description_idx` ON `task` (`descripcion`);