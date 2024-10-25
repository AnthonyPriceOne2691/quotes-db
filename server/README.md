# Filling database with initial data

For both modes (dev and prod) you have to fill DB with initial data. If database is empty than after launching database you have to follow instructions in the `database/seed/README.md` file ti fill database with quotes and categories.
All nesessary database files are located in the `database/data`

---

# Running API service in DEVELOPMENT mode

## Run docker container for the PostgreSQL and Adminer

1. Change directory to the `server` folder
1. Run DB containers using `docker compose up -d`

## Run Node.js application in development mode

1. Change directory to the `server` folder
1. Run Node.js application using NPM script `npm run dev`

## Stop application

1. Stop Node.js application
1. Stop DB containers using `docker compose down -d`

---

# Running API setvice in PRODUCTION mode

## Run PostgreSQL database somewhere in production

1. Copy database credentials for the next step

## Add environment variables

1. Create .env file in the `server` folder
1. Fill environment variables based on the `.env.sample` file

## Run Node.js application in production mode

1. Change directory to the `server` folder
2. Run Node.js application using NPM script `npm start`
