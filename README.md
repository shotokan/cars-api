<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>


## Description

This is a REST api providing CRUD operations to fetch one or several cars, create, update and delete a car.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```


## API

GET /cars 200 -- returns all resources in table

GET /cars/:carID 200 -- returns a specific resource for a given ID

POST /cars 201 -- create a new resource in db

PUT /cars/:carID 204 -- update a specific resource

DELETE /cars/:carID 204 -- delete a resource from db

POST /cars/trigger-process 202 -- launch a process to remove owners and apply a discount based on requirements.

Example:

```
{
    "owners": [
        {
            "name": "Ivan",
            "purchaseDate": "2019-02-04T22:44:30.652Z"
        },
        {
            "name": "Elian",
            "purchaseDate": "2012-02-04T22:44:30.652Z"
        },
        {
            "name": "Sarah",
            "purchaseDate": "2019-01-23T22:44:30.652Z"
        }
    ],
    "manufacturer": {
        "name": "Renault",
        "phone": "202-555-0174",
        "siret": 78012998703591
    },
    "firstRegistrationDate": "2019-02-04T22:44:30.652Z",
    "price": 13500
}
```

## DOCKER

Build image:

docker build -t ultra-task .


Run container:

docker run -p 3000:3000 -d ultra-task


## Stay in touch

- Ivan - [LinkedIn](https://www.linkedin.com/in/isabido/)

