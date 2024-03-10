const { MarkovMachine } = require('./markov')

let m

beforeEach(function () {
    m = new MarkovMachine('the cat in the hat')

})

describe('test constructor functions', () => {
    test('test variable, words, returns an array', function () {
        expect(m.words).toEqual(['the', 'cat', 'in', 'the', 'hat'])
    })

    test('test makeChains method returns an object', () => {
        expect(m.makeChains()).toEqual({ "the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null] })
    })
})

test('test makeText function returns a string', () => {
    expect(m.makeText()).toEqual(expect.any(String))
})