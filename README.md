# GrinnellDBapi

# Node REST API

REST API applications for GrinnellDB using Node.js, Cheerio and Express.js framework.

This is updated code that follows [Scraping the Web With Node.js](https://scotch.io/tutorials/scraping-the-web-with-node-js) article.

## Running project

You need to have installed Node.js

### Install dependencies

To install dependencies enter project folder and run following command:
```
npm install
```

### Run server

To run server execute:
```
node bin/www
```

### Make Requests

Creating and refreshing access tokens:
```
localhost:
localhost:3000/?LastName=&FirstName=shaun&email=&campusphonenumber=&campusquery=&Homequery=&Department=&Major=&conc=&Gyear=

heroku instance:
https://murmuring-cliffs-5798.herokuapp.com/?LastName=&FirstName=shaun&email=&campusphonenumber=&campusquery=&Homequery=&Department=&Major=&conc=&Gyear=  
```


## Modules used

Some of non standard modules used:
* [express](https://www.npmjs.com/package/mongoose)
* [cheerio]

## Tools used

[Heroku](https://heroku.com)

### Still Todo:

This app has not been tested yet!!!!

## Author

This app was created by Shaun S. Mataire .

Updated by:
