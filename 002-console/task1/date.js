#!/usr/bin/env node
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const argv = yargs(hideBin(process.argv))
    //  текущее время
    .command('current', 'Current time', (y) => {
        return y.option('year', {
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
    }, current)
    // добавить время
    .command('add', 'Add time', (y) => {
        return y.option('year', {
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
    }, add)
    // вычесть время
    .command('sub', 'Subtract time', (y) => {
        return y.option('year', {
            alias: 'y',
            type: 'number',
            description: 'Subtract year'
        })
            .option('month', {
                alias: 'm',
                type: 'number',
                description: 'Subtract month'
            })
            .option('date', {
                alias: 'd',
                type: 'number',
                description: 'Subtract day'
            })
    }, sub)
    .parse();


//текущее время    
function current(argv) {
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
}

//добавить время
function add(argv) {
    const addYear = argv.year;
    const addMonth = argv.month;
    const addDate = argv.date;

    const date = new Date();

    if (addYear) {
        date.setUTCFullYear(date.getUTCFullYear() + addYear);
    }
    if (addMonth) {
        date.setUTCMonth(date.getUTCMonth() + addMonth);
    }
    if (addDate) {
        date.setUTCDate(date.getUTCDate() + addDate);
    }
    console.log(date);
}

//вычесть время
function sub(argv) {
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
}