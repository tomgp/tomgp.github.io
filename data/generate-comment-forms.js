const dsv = require('d3-dsv');
const fs = require('fs');
const speakingurl = require('speakingurl');

const data = fs.readFileSync('books.csv','utf-8');
dsv.csvParse(data)
    .forEach((book, i)=>{
        try{
            fs.writeFileSync(
                `./comments/${book.date}-${i}-${speakingurl(book.title)}-${speakingurl(book.authors)}.md`,
                `---
title: ${book.title}
author: ${book.authors}
readingDate: ${book.date}
layout: book
---`,
                {flag:'wx'}
            )
        }catch(err){
            console.log(`skipping ${book.date}-${i}-${speakingurl(book.title)}-${speakingurl(book.authors)}.md`)
        }
    });
