# M&S Products Demo

Presentation of a subset of M&S products on top of a GraphQL mock API.

## App Structure

* UI App based on Next.js
* external mock API as-is from docker image `chrismns/tech-test-mock-server:0.1.0`

## How to Start

Prerequisites: `docker-compose`

```
$ git clone https://github.com/petergolah/mandsproducts.git
$ cd mandsproducts
$ docker-compose up
```

When built UI app runs at `http://localhost:3000`

## Tests

Basic Jest config files and a sample test are added but Jest dependencies are missing. They would have issues with the default install.
