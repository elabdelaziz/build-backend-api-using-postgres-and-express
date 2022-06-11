# Storefront Backend Project

## Getting Started
1. start by making a .env file to be compatible with data in src/config.ts
2. to install dependencies: `npm install`
2. after installing run the following to connect to the app: `npm run start` *to start the server* or `npm run watch` *to watch for changes*

* Now you can start receiving requests to database

**NOTE** server running on port: `3000` while database running on `5432`
## running migrations

1. run `npm run migration:up` to create all tables
2. you can run `npm db-migrate down` to drop tables

# Environment Variables
* PORT=3000 

* NODE_ENV=dev

* POSTGRES_HOST=localhost

* POSTGRES_PORT=5432

* POSTGRES_DB=storefront_database

* POSTGRES_DB_test=storefront_database_test

* POSTGRES_USER=postgres

* POSTGRES_PASSWORD=your_password_here

* BCRYPT_PASSWORD=secret_password

* SALT_ROUNDS=10

* JWT_SECRET=secret_token