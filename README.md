# STILL WORK IN PROGRESS

## Installation

- ```yarn``` or ```lerna bootstrap``` if you have lerna installed
- You also need to have Docker installed. <br />
  If you have it, run ```docker-compose -f docker-compose.yml up```
  
## Running the project

- ```yarn run server/start:dev``` starts the server
- ```yarn run client/start:dev``` starts the client

## Migrations

Head over to ./packages/server and run ```migration:run``` to apply migrations to db


## Project structure

Project uses lerna to manage 2 packages: server(NestJS) and client(React).
This project also uses GraphQL with apollo-client and apollo-server-express implementation for backend.