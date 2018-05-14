const dsv = require('d3-dsv');
const fs = require('fs');
const speakingurl = require('speakingurl');

const data = fs.readFileSync('books.csv','utf-8');
dsv.csvParse(data)
    .forEach((book, i)=>{
        const frontMatter=`---
title: ${book.title}
author: ${book.authors}
reading date: ${book.date}
---`;
        try{
            fs.writeFileSync(
                `./comments/${i}-${speakingurl(book.title)}-${speakingurl(book.authors)}.yml`,
                frontMatter,
                {flag:'wx'}
            )
        }catch(err){
            console.log(`skipping ${i}-${speakingurl(book.title)}-${speakingurl(book.authors)}.yml`)
        }
    });
