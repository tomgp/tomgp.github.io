'use strict';

var d3 = require('d3');
var fs = require('fs');

var data = d3.csv.parse( fs.readFileSync('books.csv', 'utf-8') );

var authors = {
    
};

data.forEach(function(d,i ){
    var names = d.authors.split(',');
    names.forEach(function(name){
        if(authors[name] == undefined){
            authors[name] = {
                name:name,
                born:null,
                died:null,
                books:[],
            };
        }
        authors[name].books.push(i);
    })
});

var records = [];

for(var key in authors){
    authors[key].books = authors[key].books.join(',');
    records.push(authors[key]);
}

fs.writeFileSync('authors.csv',d3.csv.format(records));