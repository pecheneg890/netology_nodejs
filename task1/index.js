#!/usr/bin/env node
const readline = require('node:readline');
const fs = require('fs');
const { stdin: input, stdout: output } = require('node:process');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
    .option('log', {
        alias: 'l',
        type: 'string',
        description: 'имя файла с логом'
    }).parse();

const file = argv.log;
if (!file) {
    console.log('Укажите имя файла для логов'); 
    return;
}

const rl = readline.createInterface({ input, output });
const hiddenNumber = 1 + Math.floor(Math.random() * 2);
console.log(`Загадано число в диапазоне от 1 до 2`);

getNextAnswer();

function getNextAnswer() {
    rl.question('', (answer) => {
        answer = Number.parseInt(answer);
        let guessed = false;

        if (hiddenNumber === answer) {
            console.log('Число отгадано');
            guessed = true;
        } else {
            console.log('Число не отгадано');
        }

        //заполнение лога
        const content = new Date().toISOString() + ',' + guessed + '\n';
        fs.appendFile(file, content, (err) => {
            if (err) console.log(err);
            console.log('Лог создан');
        })
        rl.close();
    });
}
