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

------------------------------------ READ PRODUCTS ------------------------------------
-- A basic view for getting all the products
CREATE VIEW "products_view" AS
SELECT
    p.product_id,
    p.product_name,
    p.product_price,
    p.product_description,
    c.category_name,
    u.user_name,
    u.user_lastname
FROM
    products p
JOIN
    products_categories c ON p.category_id = c.category_id
JOIN
    users u ON p.user_id = u.user_id;

------------------------------------ Function to create a new user ------------------------------------
-- This function creates a new user and returns the user_id
-- It checks if the email already exists before creating a new user
-- If the email exists, it raises an exception
CREATE OR REPLACE FUNCTION create_user(
    p_user_name VARCHAR,
    p_user_lastname VARCHAR,
    p_user_email VARCHAR,
    p_user_password VARCHAR
)
RETURNS UUID AS $$
DECLARE
    new_user_id UUID;
BEGIN
	IF EXISTS (SELECT 1 FROM "users" WHERE user_email = p_user_email) THEN
        RAISE EXCEPTION 'Email % already exists', p_user_email;
    END IF;

    INSERT INTO "users" (
        user_name,
        user_lastname,
        user_email,
        user_password
    )
    VALUES (
        p_user_name,
        p_user_lastname,
        p_user_email,
        p_user_password
    )
    RETURNING user_id INTO new_user_id;

    RETURN new_user_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------ Function to create a new product category ------------------------------------
CREATE OR REPLACE FUNCTION create_product_category(
    p_category_name TEXT,
    p_category_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_category_id UUID;
BEGIN
    -- Check if the category already exists
    IF EXISTS (
        SELECT 1 FROM products_categories WHERE category_name = p_category_name
    ) THEN
        RAISE EXCEPTION 'Category name "%" already exists', p_category_name;
    END IF;

    -- Insert the new category
    INSERT INTO products_categories (
        category_name,
        category_description
    )
    VALUES (
        p_category_name,
        p_category_description
    )
    RETURNING category_id INTO new_category_id;

    RETURN new_category_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------ CREATE PRODUCTS ------------------------------------
CREATE OR REPLACE FUNCTION create_product(
    p_product_name VARCHAR,
    p_product_price DECIMAL(10,2),
    p_category_id UUID,
    p_user_id UUID,
    p_product_description TEXT DEFAULT NULL
)
RETURNS UUID AS $$
DECLARE
    new_product_id UUID;
BEGIN
    -- Check if the category exists
    IF NOT EXISTS (SELECT 1 FROM products_categories WHERE category_id = p_category_id) THEN
        RAISE EXCEPTION 'Category ID "%" does not exist', p_category_id;
    END IF;

    -- Check if the user exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = p_user_id) THEN
        RAISE EXCEPTION 'User ID "%" does not exist', p_user_id;
    END IF;

    -- Insert the new product
    INSERT INTO products (
        product_name,
        product_price,
        product_description,
        category_id,
        user_id
    ) VALUES (
        p_product_name,
        p_product_price,
        p_product_description,
        p_category_id,
        p_user_id
    )
    RETURNING product_id INTO new_product_id;

    RETURN new_product_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------ UPDATE PRODUCTS ------------------------------------
CREATE OR REPLACE FUNCTION update_product(
    p_product_id UUID,
    p_product_name VARCHAR,
    p_product_price DECIMAL(10,2),
    p_product_description TEXT,
    p_category_id UUID,
    p_user_id UUID
)
RETURNS VOID AS $$
BEGIN
    -- Check if product exists
    IF NOT EXISTS (SELECT 1 FROM products WHERE product_id = p_product_id) THEN
        RAISE EXCEPTION 'Product with ID "%" not found.', p_product_id;
    END IF;

    -- Check category exists
    IF NOT EXISTS (SELECT 1 FROM products_categories WHERE category_id = p_category_id) THEN
        RAISE EXCEPTION 'Category ID "%" does not exist.', p_category_id;
    END IF;

    -- Check user exists
    IF NOT EXISTS (SELECT 1 FROM users WHERE user_id = p_user_id) THEN
        RAISE EXCEPTION 'User ID "%" does not exist.', p_user_id;
    END IF;

    -- Perform update
    UPDATE products
    SET
        product_name = p_product_name,
        product_price = p_product_price,
        product_description = p_product_description,
        category_id = p_category_id,
        user_id = p_user_id
    WHERE
        product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;

------------------------------------ DELETE PRODUCTS ------------------------------------
CREATE OR REPLACE FUNCTION delete_product(
    p_product_id UUID
)
RETURNS VOID AS $$
BEGIN
    -- Check if product exists
    IF NOT EXISTS (SELECT 1 FROM products WHERE product_id = p_product_id) THEN
        RAISE EXCEPTION 'Product with ID "%" not found.', p_product_id;
    END IF;

    -- Delete the product
    DELETE FROM products WHERE product_id = p_product_id;
END;
$$ LANGUAGE plpgsql;