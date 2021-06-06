const parse = require('csv-parse');
const fs = require('fs');

const results = [];

fs.createReadStream('kepler_data.csv')
    .on('data', (chunk) => {
        results.push(chunk)
    })
    .on('error', (err) => {
        console.log(`Error Occured ${err}`)
    })
    .on('end', () => {
        console.log(results);
        console.log('done');
    })