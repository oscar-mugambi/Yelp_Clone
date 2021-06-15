-- for help \?
--to list databases \l
--to create a db CREATE DATABASE databse name

--to connect to a different db \c db name
--list all tables \d
--view table \d name of table


--to drop db drop table name of table
--create TABLE


--count number of rows  select count(*) from reviews;
--average rating select trunc(AVG(rating),2) as average_review from reviews;
--select trunc(AVG(rating),2) as average_rating from reviews where restaurant_id = 4;
--count total revviews select count(rating) from reviews where restaurant_id = 2;

CREATE TABLE products (
  id INT,
  name VARCHAR(50),
  price INT,
  on_sale boolean
);

ALTER TABLE products ADD COLUMN featured boolean;
ALTER TABLE products DROP COLUMN featured;


CREATE TABLE restaurants(
  id BIGSERIAL NOT NULL PRIMARY KEY,
  name VARCHAR(50) NOT NULL,
  location VARCHAR(50) NOT NULL,
  price_range INT NOT NULL check(price_range >=1 and price_range<=5)
  );


INSERT INTO restaurants(id,name,location,price_range) values(123, 'kfc', 'nairobi', '50');

SELECT * FROM restaurants;


CREATE TABLE reviews (
  id BIGSERIAL NOT NULL PRIMARY KEY,
  restaurant_id BIGINT NOT NULL REFERENCES restaurants(id),
  name VARCHAR(50) NOT NULL,
  review TEXT NOT NULL,
  rating INT check(rating >= 1 and rating <=5) NOT NULL
);


INSERT INTO reviews (restaurant_id, name, review, rating) values(3,'harry','great',3)






