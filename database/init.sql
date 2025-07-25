CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE "users" (
	user_id UUID DEFAULT uuid_generate_v4() NOT NULL,
	user_name VARCHAR(50) NOT NULL,
	user_lastname VARCHAR(50) NOT NULL,
	user_email VARCHAR(100) UNIQUE NOT NULL,
	user_password VARCHAR(255) NOT NULL,
	user_created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,

	PRIMARY KEY (user_id)
);

CREATE TABLE "products_categories" (
    category_id UUID DEFAULT uuid_generate_v4(),
    category_name TEXT UNIQUE NOT NULL,
    category_description TEXT,
    category_created_at TIMESTAMP DEFAULT NOW(),

	PRIMARY KEY (category_id)
);


CREATE TABLE "products" (
	product_id UUID DEFAULT uuid_generate_v4(),
	product_name VARCHAR(250),
	product_price DECIMAL(10,2),
	product_description TEXT,
	category_id UUID,
	user_id UUID,
	
	PRIMARY KEY (product_id),
	FOREIGN KEY (user_id) REFERENCES "users"(user_id),
	FOREIGN KEY (category_id) REFERENCES "products_categories"(category_id)
);