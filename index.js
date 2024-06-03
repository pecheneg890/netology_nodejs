http = require('http');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');
const config = require('./config.js');

const argv = yargs(hideBin(process.argv))
    .option('city', {
        alias: 'c',
        type: 'string',
        description: 'City'
    })
    .parse();

if (!argv.city) {
    console.log('Укажите город');
    return;
}

const url = new URL(config.API_ENDPOINT);
url.searchParams.set('q', argv.city);
url.searchParams.set('key', config.API_KEY);

http.get(url, (res) => {
    const { statusCode } = res
    if (statusCode !== 200) {
        console.log(`statusCode: ${statusCode}`)
        return
    }

    res.setEncoding('utf8')
    let rowData = ''
    res.on('data', (chunk) => rowData += chunk)
    res.on('end', () => {
        let parseData = JSON.parse(rowData)

        console.log(`Температура ${parseData.current.temp_c}`);
        console.log(`Влажность ${parseData.current.humidity}`);
        console.log(`Облачность ${parseData.current.cloud}`);
        console.log(`Скорость ветра ${parseData.current.wind_kph}`);
    })
}).on('error', (err) => {
    console.error(err)
})