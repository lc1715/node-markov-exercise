/** Textual markov chain generator */

class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let obj = {}

    for (let i = 0; i < this.words.length; i++) {

      let word = this.words[i]
      let nextWord = this.words[i + 1]

      if (i == this.words.length - 1) {
        obj[word] = [null]
      } else if (word in obj) {
        obj[word].push(nextWord)
      }
      else {
        obj[word] = [nextWord]
      }
    }

    return obj
  }

  /** return random text from chains */

  makeText(numWords = 100) {
    let chain = this.makeChains()

    let textArr = []

    let chainArr = Object.keys(chain)
    let randomNum = Math.floor(Math.random() * chainArr.length)

    textArr.push(chainArr[randomNum])

    while (textArr.length < numWords) {

      let lastWordInChain = textArr[textArr.length - 1]

      if (chain[lastWordInChain][0] == null) {
        textArr.push(chain[lastWordInChain])
        break;
      }
      else if (chain[lastWordInChain].length > 1) {
        let randomNum2 = Math.floor(Math.random() * chain[lastWordInChain].length)
        textArr.push(chain[lastWordInChain][randomNum2])
      }
      else {
        textArr.push(chain[lastWordInChain][0])
      }
    }

    let textString = textArr.join(' ')
    return textString
  }
}

let mm = new MarkovMachine('the cat in the hat')

mm.makeText(numWords = 5)


module.exports = ({ MarkovMachine: MarkovMachine })


