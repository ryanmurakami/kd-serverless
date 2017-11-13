# Serverless Demo Application

## Prerequisites
[Node v6+](https://nodejs.org/en/)
[Serverless v1.24+](https://www.serverless.com/)

## Getting Started

Install with Serverless:
```sh
$ serverless install --url https://github.com/ryanmurakami/kd-serverless --name my-svc
```

or clone this repo:
```sh
$ git clone https://github.com/ryanmurakami/kd-serverless.git
```

Replace the value in `serverless.yml` on line 4 with your kuali API key.

## Installation

```sh
$ npm install
```

## Operations

Run locally

```sh
$ sls offline
```

Deploy

```sh
$ sls deploy
```
