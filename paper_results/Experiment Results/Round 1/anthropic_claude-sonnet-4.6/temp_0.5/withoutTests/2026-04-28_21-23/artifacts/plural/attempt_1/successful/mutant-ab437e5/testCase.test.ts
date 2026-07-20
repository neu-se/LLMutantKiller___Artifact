import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not apply consonant+y rule to words where consonant+y appears in the middle but word does not end in consonant+y', () => {
    // "byway" contains "by" (consonant+y) but ends in "ay" (vowel+y)
    // Original regex /[^aeiou]y$/ only matches at end, so "byway" → "byways"
    // Mutated regex /[^aeiou]y/ matches anywhere, so "byway" would incorrectly → "bywaies"
    expect(plural('byway')).toBe('byways')
  })
})