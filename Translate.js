'use strict';


// Calling JQuery 3.1.0 Core
<script src="https://code.jquery.com/jquery-3.1.0.js" integrity="sha256-slogkvB1K3VOkzAI8QITxV3VzpOnkeNVsKvtkYLMjfk=" crossorigin="anonymous"></script>


< script type = "text/javascript" >
  $(document).ready(function() {

      // The event listener for the file upload
      document.getElementById('txtFileUpload').addEventListener('change', upload, false);

      // Method that checks that the browser supports the HTML5 File API
      function browserSupportFileUpload() {
        var isCompatible = false;
        if (window.File && window.FileReader && window.FileList && window.Blob) {
          isCompatible = true;
        }
        return isCompatible;
      }


//      Method that reads and processes the selected file
      function upload(evt) {
        if (!browserSupportFileUpload()) {
          alert('The File APIs are not fully supported in this browser!');
        } else {
          var data = null;
          var file = evt.target.files[0];
          var reader = new FileReader();
          reader.readAsText(file);
          reader.onload = function(event) {
            var csvData = event.target.result;
            data = $.csv.toArrays(csvData);
            if (data && data.length > 0) {
              alert('Imported -' + data.length + '- rows successfully!');
            } else {
              alert('No data to import!');
            }
          };
          reader.onerror = function() {
            alert('Unable to read ' + file.fileName);
          };
        }
      }
    };

//    Read the file and print its contents.
    var fs = require('fs'),
      filename = process.argv[2];
    var Doc = fs.readFileSync("Sale.csv", 'utf8', function(err, data) {
      if (err) throw err;
      return data
    });

//    Translating the CSV file into JSON
    function csvJSON(Doc) {

      var lines = Doc.split("\n");

      var result = [];

      var headers = lines[0].split(",");

      for (var i = 1; i < lines.length - 1; i++) {

        var obj = {};
        var currentline = lines[i].split(",");

        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }

        result.push(obj);

      }

      //return result; //JavaScript object
      return result
    }

    var res = csvJSON(Doc)

    //Picking certain categories and pushing them into an array

    var resultsv2 = [];
    for (var i = 0; i < res.length; i++) {
      var tmp = {
        'UPC': (res[i]['UPC/EAN']),
        'sold': parseInt(res[i]['Qty Sold']),
        'returned': parseInt(res[i]['Qty Returned By Consumer']),
        'Start Date': (res[i]['Begin Date']),
        'End Date': (res[i]['End Date']),

      }

      resultsv2.push(tmp);
    }

    for (var i = 0; i < resultsv2.length; i++) {
      if (isNaN(resultsv2[i].sold))
        resultsv2[i].sold = 0
    }

    for (var i = 0; i < resultsv2.length; i++) {
      if (isNaN(resultsv2[i].returned))
        resultsv2[i].returned = 0
    }

    var resultsv3 = resultsv2.reduce(function(res, obj) {
        if (!(obj.UPC in res))
          res.__array.push(res[obj.UPC] = obj);
        else {

          res[obj.UPC].sold += obj.sold;

          res[obj.UPC].returned += obj.returned;
        }
        return res;
      }, {
        __array: []
      }).__array
      .sort(function(a, b) {
        return b.returned - a.returned;
      });

console.log(resultsv3);



    //lets require/import the mongodb native drivers.
    var mongodb = require('mongodb');

    //We need to work with "MongoClient" interface in order to connect to a mongodb server.
    var MongoClient = mongodb.MongoClient;

    // Connection URL. This is where your mongodb server is running.
    var url = 'mongodb://localhost:27017/Sales';

    // Use connect method to connect to the Server
    MongoClient.connect(url, function(err, db) {
      if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
      } else {
        //HURRAY!! We are connected. :)
        console.log(resultsv3)
        db.collection('Sales').insertOne({
          resultsv3
        }, function(err, res) {
          if (err) {}
          // console.log(err)
          else {}
          // console.log(res)

        })
      }

      console.log('Connection established to', url);

      // do some work here with the database.

      //Close connection
      db.close()
    })
