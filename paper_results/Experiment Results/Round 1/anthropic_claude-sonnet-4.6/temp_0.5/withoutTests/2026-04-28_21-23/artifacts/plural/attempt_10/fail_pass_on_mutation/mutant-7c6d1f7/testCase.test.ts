import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize a word ending in consonant+o as es, confirming the duplicate rule does not cause s to win', () => {
    // In mutated code, there are two /[^aeiouy]o$/ rules
    // The +es rule has higher priority (added second via unshift)
    // So consonant+o words should still get 'es'
    // BUT: what if the +s rule somehow wins?
    // Let me test with 'cello' - wait, that has a special rule 'cellos'
    // Let me test with 'mango'
    expect(plural('mango')).toBe('mangoes')
  })
})