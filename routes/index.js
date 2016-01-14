//
//  index.js
//  DBapi
//
//  Created by Shaun Mataire on 1/14/16.
//  Copyright © 2016 AppDev. All rights reserved.
//

var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');

/* GET home page. */
router.get('/', function(req, res, next) {
  //application goes here

  //query values
  var lastName = req.query.LastName
  var firstName = req.query.FirstName
  var email = req.query.email
  var phone = req.query.campusphonenumber
  var campus = req.query.campusquery
  var home = req.query.Homequery
  var department = req.query.Department
  var major = req.query.Major
  var concentration= req.query.conc
  var graduationYear = req.query.Gyear

  /*
    example query url:
    https://murmuring-cliffs-5798.herokuapp.com/?LastName=&FirstName=shaun&email=&campusphonenumber=&campusquery=&Homequery=&Department=&Major=&conc=&Gyear=  */

  //url
  url = 'https://itwebapps.grinnell.edu/classic/asp/campusdirectory/GCdefault.asp?transmit=true&blackboardref=true&'
      + 'LastName=' + lastName + '&LNameSearch=startswith&'
      + 'FirstName=' + firstName + '&FNameSearch=startswith&'
      + 'email=' + email
      + '&campusphonenumber=' + phone
      + '&campusquery=' + campus
      + '&Homequery=' + home
      + '&Department=' + department
      + '&Major=' + major
      + '&conc=' + concentration
      + '&SGA=&Hiatus=&Gyear=' + graduationYear
      + '&submit_search=Search'

  request(url, function(error, response, html){
    //check if there were errors making the request
    if(!error){
      // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

      var $ = cheerio.load(html);

      var jsonRes = []

      // We'll use the unique header class as a starting point.
      $('table').filter(function () {
        // Let's store the data we filter into a variable so we can easily see what's going on.

        var data = $(this)

        // In examining the DOM we notice that the firstName rests within the first child element of the header tag.
        // Utilizing jQuery we can easily navigate and get the text by writing the following code:

        //Traverse of result list child
        var queryResultchild = data.next().next().children().next().next();
        queryResultchild.each(function(){

          //list entry properties
          var jsonCell = { pcardImageUrl: "",
                            name: "",
                            dept: "",
                            phone: "",
                            email: "",
                            address: "",
                            box: "",
                             status: ""
                          }

          //looper identifies current row
          var looper = 0;

          //get fields for each entry
          $(this).children().each(function(){

            switch (looper) {
                case 0:
                    jsonCell.pcardImageUrl = $(this).first().attr('src');//todo :get url
                    break;
                case 1:
                    jsonCell.name = $(this).text();
                    break;
                case 2:
                    jsonCell.dept = $(this).text();
                    break;
                case 3:
                    jsonCell.phone = $(this).text();
                    break;
                case 4:
                    jsonCell.email = $(this).text();
                    break;
                case 5:
                    jsonCell.address = $(this).text();
                    break;
                case 6:
                    jsonCell.box = $(this).text();
                    break;
                case 7:
                    status = $(this).text();
                    break;
            }
            looper++;
          });
          jsonRes.push(jsonCell);
        });

      })
      res.send(jsonRes)
    }
  })
});

module.exports = router;
