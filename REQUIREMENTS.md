## Users

* index [token required]: `/api/users` [get]
* create [token required]: `/api/users` [post]
* show [token required]: `/api/users/:id` [get]
* update: `/api/users/:id` [patch]
* delete: `/api/users/:id` [delete]

* Authenticate (args: username, password) [token required] : `/auth` [GET]

## Products

* index: `/api/products` [get]
* create [token required]: `/api/products` [post]
* update: `/api/products/:id` [patch]
* delete: `/api/products/:id` [delete]

## Orders

* index: `/api/orders` [get]
* create: `/api/orders` [post]
* show: `/api/orders/:userId` [get]
* update [token required]: `/api/orders/:userId` [put]
* delete: `/api/orders/:orderId` [delete]

## order_products
* create: `/api/orders/:id/products` [post]


# Data Shapes
- - - -

## User
* id
* email
* user_name
* first_name
* last_name
* password

data          | type
------------- | -------------
id            | SERIAL PRIMARY KEY
email         | VARCHAR(50) unique
user_name     | VARCHAR(50)
first_name    | VARCHAR(50)
last_name     | VARCHAR(50)
password      | VARCHAR(255)

## Product
* id
* title
* price
* category

data          | type
------------- | -------------
id            | SERIAL PRIMARY KEY
title         | VARCHAR(150)
price         | integer
category      | VARCHAR(100)

## Order

data          | type
------------- | -------------
id            | SERIAL PRIMARY KEY
status        | VARCHAR(64)
user_id       | BIGINT FOREIGN KEY to users(id)

## Order-products

data          | type
------------- | -------------
id            | SERIAL PRIMARY KEY
quantity      | INTEGER
order_id      | BIGINT FOREIGN KEY to users(id)
product_id    | BIGINT FOREIGN KEY to products(id)
