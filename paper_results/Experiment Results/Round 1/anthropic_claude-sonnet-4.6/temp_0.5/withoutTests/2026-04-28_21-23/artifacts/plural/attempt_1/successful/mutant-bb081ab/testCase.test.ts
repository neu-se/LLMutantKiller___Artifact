import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural string rule with function result', () => {
  it('should call the function when a string rule matches', () => {
    // Add a custom rule with a string match and function result
    const customWord = 'testword_unique_xyz'
    plural.addRule(customWord, function(w: string) { return w + '_pluralized' })
    
    const result = plural(customWord)
    expect(result).toBe(customWord + '_pluralized')
  })
})