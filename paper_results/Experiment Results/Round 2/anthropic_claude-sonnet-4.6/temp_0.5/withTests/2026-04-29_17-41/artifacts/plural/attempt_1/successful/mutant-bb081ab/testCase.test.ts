import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural with string rule and function result', () => {
  it('should call the function when a string rule matches', () => {
    const testWord = 'xyzzy_unique_word_12345'
    plural.addRule(testWord, function(w: string) { return w + '_pluralized' })
    expect(plural(testWord)).toBe(testWord + '_pluralized')
  })
})