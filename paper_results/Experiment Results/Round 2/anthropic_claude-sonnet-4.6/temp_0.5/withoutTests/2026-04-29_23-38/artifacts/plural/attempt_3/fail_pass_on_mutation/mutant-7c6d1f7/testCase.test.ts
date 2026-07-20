import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize "tomato" as "tomatoes" not "tomatos"', () => {
    // 'tomato' ends in 'to' (consonant 't' before 'o')
    // Original: the /[^aeiouy]o$/i rule (added second, unshifted to front) matches first -> 'tomatoes'
    // Mutant: the first rule is now also /[^aeiouy]o$/i but returns w+'s' -> 'tomatos'
    expect(plural('tomato')).toBe('tomatoes')
  })
})