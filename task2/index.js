#!/usr/bin/env node
const fs = require('fs');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('log', {
        alias: 'l',
        type: 'string',
        description: 'имя файла с логом'
    }).parse();
const file = argv.log;       

const  readerStream = fs.createReadStream(file)
let fileData = '';

readerStream.on('data', (chunk)=>{
    fileData += chunk;
});

readerStream.on('end', ()=>{
    //разделение по строкам
    const rows = fileData.split('\n');
    //удаление пустой строки
    if (rows.length > 0 && !rows[rows.length - 1]) rows.pop();

    //количество выигрышей
    let guessedCount = rows.reduce((acc, cur)=>{
        const rowData = cur.split(',');
        if (rowData[1]==='true') acc++;
        return acc;
    }, 0)

    console.log(`общее количество партий ${rows.length}`);
    console.log(`количество выигранных партий ${guessedCount}`);
    console.log(`количество проигранных партий ${rows.length - guessedCount}`);
    console.log(`процентное соотношение выигранных партий ${guessedCount/rows.length}`);

})