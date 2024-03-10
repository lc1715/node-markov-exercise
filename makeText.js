/** Command-line tool to generate Markov text. */

const fs = require('fs')
const axios = require('axios')
const { MarkovMachine } = require('./markov')


function generateMarkovText(text) {
    let mm = new MarkovMachine(text)
    let markovText = mm.makeText()
    console.log('markovText=', markovText)
}


function fileText(pathToFile) {
    fs.readFile(pathToFile, 'utf8', function (err, data) {
        if (err) {
            console.log('Error=', err)
            process.exit(1)
        }
        generateMarkovText(data)
        console.log("generated text from file 'eggs.txt'")
    })
}

async function urlText(url) {
    try {
        let resp = await axios.get(url)
        generateMarkovText(resp.data)
        console.log('Data=', resp.data)
        console.log('generated text from that URL')
    } catch (err) {
        console.log('Error=', err)
    }
}


if (process.argv[2] == 'file') {
    fileText(process.argv[3])
} else if (process.argv[2] == 'url') {
    urlText(process.argv[3])
}

