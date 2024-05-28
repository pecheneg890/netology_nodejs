#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    .option('year', {
        alias: 'y',
        type: 'boolean',
        description: 'Show current year'
    })
    .option('month', {
        alias: 'm',
        type: 'boolean',
        description: 'Show current month'
    })
    .option('date', {
        alias: 'd',
        type: 'boolean',
        description: 'Show current day'
    })
    .parse();

const printYear = argv.year;
const printMonth = argv.month;
const printDate = argv.date;

if (printYear)
    console.log(new Date().getUTCFullYear());
else if (printMonth)
    console.log(new Date().getUTCMonth() + 1);
else if (printDate)
    console.log(new Date().getUTCDate());
else
    console.log(new Date());