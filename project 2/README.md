# Project 2: Drill and practice

The application has been deployed online to ***

## About the application

The application hosts shared shoppings lists that multiple users can use for common shopping purposes. The application can store multiple shopping lists that display the items placed on each list via the the form. The application has been deployed to [fly.io](https://wsd-shopping-lists.fly.dev/).

* By default, the application starts on the port `7777` and when run locally, can be accessed at http://localhost:7777.
* The application is launched using a file called app.js, which is in the root folder of the application (folder shopping-lists in the returned zip).
* Dependencies are defined in a file called deps.js, which exports them into use of the project.
* The application follows a three-tier architecture.
* Application uses a layered architecture with views, controllers, services, and database.


## Contents

* `e2e-playwright` - Playwright End-to-End tests
* `flyway` - SQL scripts used to initialize the database
* `drill-and-practice` - App source code
    * `controllers` - Request handling controllers
    * `database` - Database query utilities
    * `services` - Services for accessing database, e.g. get or insert data
    * `views` - Eta views for the app
        * `layouts` - Layouts for Eta views
* `docker-compose.yml` - Docker Compose recipe for the project
* `project.env` - File for environment variables
* `README.md` - This file


## Starting and shutting down

The app is used with Docker Compose.

- To start the app, open up the terminal in the folder that contains the `docker-compose.yml` file and type `docker-compose up`.
- To stop the app, press `ctrl+C` (or similar) in the same terminal where you wrote the command `docker-compose up`. Another option is to open up a new terminal and navigate to the folder that contains the `docker-compose.yml` file, and then write `docker-compose stop`.


## Watching for changes

The app by default watches for changes in the Deno code and restarts the application whenever needed. There is a [bug](https://github.com/denoland/deno/issues/6966), however, that leads to this functionality not working in Windows Subsystem for Linux. When working with WSL, stop and start the container between changes.


## Database

When the app is up and running, you can access the PostgreSQL database from the terminal using the following command:

```
docker exec -it database-server psql -U username database
```

This opens up `psql` console, where you can write SQL commands.


## Database migrations

When the app is started, Flyway is used to run the SQL commands in the database migration files that reside in the `flyway/sql` folder. If a database exists, Flyway checks that the schema corresponds to the contents of the database migration files.

If you need new database tables or need to alter the schema, the correct approach is to create a new migration file and start the walking skeleton. Another approach is to modify the existing migration file -- if you do this, the migrations fail, however.

If you end up altering the migration files (or the schema in the database), you can clean up the database (remove the existing database tables) by stopping the containers and the related volumes -- with the database data -- with the command `docker-compose down`. When you launch the walking skeleton again after this, the database is newly created based on the migration files.


## Deno cache

When we launch a Deno application, Deno loads any dependencies that the application uses. These dependencies are then stored to the local file system for future use. The app uses the `app-cache`-folder for storing the dependencies. If you need to clear the cache, empty the contents of the folder.


## Testing

The app uses Playwright for End-to-End testing.
The tests can be run with the following command:
```
docker-compose run --entrypoint=npx e2e-playwright playwright test && docker-compose rm -sf
```