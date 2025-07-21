CREATE TABLE `items_table` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`title` varchar(100) NOT NULL,
	`price` decimal(10,2) NOT NULL,
	`willing_to_trade` varchar(3) NOT NULL DEFAULT 'No',
	`trading_for` varchar(255),
	`description` text,
	`category` varchar(30) NOT NULL,
	`condition` varchar(30),
	`used_condition_description` text,
	`mint_company` varchar(10),
	`mint_grade` varchar(20),
	`image_url` longtext,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `items_table_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users_table` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`clerk_user_id` varchar(255) NOT NULL,
	`name` varchar(100) NOT NULL,
	`email` varchar(150) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_table_id` PRIMARY KEY(`id`)
);
