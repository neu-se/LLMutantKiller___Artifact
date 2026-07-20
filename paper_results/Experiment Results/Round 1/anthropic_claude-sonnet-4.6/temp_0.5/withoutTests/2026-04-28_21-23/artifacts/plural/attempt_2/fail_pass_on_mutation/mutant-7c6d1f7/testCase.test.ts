import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in consonant+o with es, not s', () => {
    // In original: /[aeiouy]o$/ adds 's', /[^aeiouy]o$/ adds 'es'
    // In mutated: both rules match /[^aeiouy]o$/, one adds 's' (inserted second, lower priority) and one adds 'es'
    // For a word like 'volcano' ending in consonant+o:
    // original -> 'volcanoes', mutated -> could be 'volcanos' if the 's' rule takes priority
    // The mutated code inserts the duplicate /[^aeiouy]o$/ rule AFTER the 'es' one, giving it higher priority via unshift
    expect(plural('volcano')).toBe('volcanoes')
  })
})