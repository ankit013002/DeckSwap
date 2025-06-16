CREATE TABLE `items_table` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`title` varchar(100) NOT NULL,
	`description` text,
	`category` varchar(30) NOT NULL,
	`condition` varchar(30),
	`image_url` varchar(255),
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `items_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(100),
	`email` varchar(150) NOT NULL,
	`password_hash` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`)
);
