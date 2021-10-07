# Url Parser

A node + nestjs server (one API endpoint)

GET `api/parse/:url`

This endpoint returns a parsed version of the html content of the **url**, and returns back a response in the
following format. The idea is to create a response that can then be shown to the user as a
card to the user for what the url does. This is also known as **_site previews_** / **_link unfurling_**.

Sample Response:

```json
{
  "title": "title of the website",
  "favicon": "favicon of website",
  "description": "description of website"
}
```

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## How to use

Execute [`git clone https://github.com/Onihani/url-parser.git`](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository) to clone the repository

Create a .env file with a variable `DATABASE_URL`. Where `DATABASE_URL` is the connection URI of your prosgresql database. For creating to cache parsed urls

Make sure you have npm and node installed on your local system

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
