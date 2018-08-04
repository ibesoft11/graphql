# Rchain Graphql Server

A GraphQL server for Rchain built with NodeJs to enable easy communication between the Bounty application and a self sovereign front-end. GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more and makes it easier to evolve APIs over time.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites

Inside the project directory, run

```
npm install

```
to install required dependencies.

### Credentials
This application requires valid login credentials to connect with the MySql database, on your project directory:
* Create a file config.js
* Inside config.js, type the following : 

```
var credentials = {
    user: USERNAME,
    password: PASSWORD
}
module.exports = credentials;

```

### Testing
To test the application on your local machine, run

```
npm start
```

on your terminal.

A nice GraphQL playground should come up on your browser where you can run sample queries.
Example Query:

```
query {
  issues{
    num
    title
    state
  }
}
```

## Built With

* [Sequelize](http://docs.sequelizejs.com) - Sequelize is a promise-based ORM for Node.js v4 and up. It supports the dialects PostgreSQL, MySQL, SQLite and MSSQL and features solid transaction support, relations, read replication and more.
* [Graphql-yoga](https://www.npmjs.com/package/graphql-yoga) - Fully featured GraphQL server that works well with all GraphQL clients (apollo, relay...)
* [mysql2](https://www.npmjs.com/package/mysql2) - MySQL client for Node.js with focus on performance. Supports prepared statements...

## Authors

* **Ibe Ogele** - *Initial work* - [ibesoft11](https://github.com/ibesoft11)

## Acknowledgments

* JimScarver - For help with hosting.
