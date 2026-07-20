import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should pluralize words ending in a vowel followed by o (like stereo) by adding s', () => {
    // Words ending in a vowel + o should get 's' appended (stereo -> stereos)
    // The original rule /[aeiouy]o$/i handles this case
    // The mutation changes it to /[^aeiouy]o$/i which would match consonant+o instead
    expect(plural('stereo')).toBe('stereos')
  })
})