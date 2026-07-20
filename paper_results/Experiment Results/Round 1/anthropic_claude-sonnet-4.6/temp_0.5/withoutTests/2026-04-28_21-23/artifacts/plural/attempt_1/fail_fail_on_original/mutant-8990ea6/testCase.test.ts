import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural - quy rule mutation detection', () => {
  it('should not apply the -ies suffix to a word containing "quy" but not ending in "quy"', () => {
    // The word "quys" contains "quy" but does not end with "quy"
    // Original regex: /[^aeiou]y$|quy$/i - requires "quy" at the END of the word
    // Mutated regex: /[^aeiou]y$|quy/i - matches "quy" ANYWHERE in the word
    // Original: "quys" doesn't match either pattern, returns "quyss"
    // Mutant: "quys" matches "quy" (not anchored), applies ies rule -> "quies"
    const result = plural('quys')
    // Original code: no rule matches "quys", so it appends 's' -> "quyss"
    expect(result).toBe('quyss')
  })
})