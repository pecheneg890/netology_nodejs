#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'number',
        description: 'Add year'
    })
    .option('month', {
        alias: 'm',
        type: 'number',
        description: 'Add month'
    })
    .option('date', {
        alias: 'd',
        type: 'number',
        description: 'Add day'
    })
    .parse();

const addYear = argv.year;
const addMonth = argv.month;
const addDate = argv.date;

const date = new Date();

if (addYear) {
    date.setUTCFullYear(date.getUTCFullYear() - addYear);
}

if (addMonth) {
    date.setUTCMonth(date.getUTCMonth() - addMonth);
}

if (addDate) {
    date.setUTCDate(date.getUTCDate() - addDate);
}

console.log(date);