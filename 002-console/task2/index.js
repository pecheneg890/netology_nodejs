#!/usr/bin/env node
const readline = require('node:readline');
const { stdin: input, stdout: output } = require('node:process');

const rl = readline.createInterface({ input, output });
const min = 0;
const max = 10;
const hiddenNumber = min + Math.floor(Math.random() * (max - min));
console.log(`Загадано число в диапазоне от ${min} до ${max}`);

getNextAnswer();

function getNextAnswer() {
    rl.question('', (answer) => {
        answer = Number.parseInt(answer);

        if (hiddenNumber === answer) {
            console.log(`Отгадано число ${hiddenNumber}`)
            rl.close();
        } else {
            if (hiddenNumber < answer)
                console.log('Меньше');
            else
                console.log('Больше');
            getNextAnswer();
        }
    });
}
