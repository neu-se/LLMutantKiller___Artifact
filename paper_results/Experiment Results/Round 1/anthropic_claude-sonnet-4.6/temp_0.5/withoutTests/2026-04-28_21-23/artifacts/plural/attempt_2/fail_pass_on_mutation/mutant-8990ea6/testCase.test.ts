import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural - quy rule mutation detection', () => {
  it('should apply the -es suffix to "quys" (ends in s) rather than the -ies suffix', () => {
    // "quys" ends in 's', so the /x$|ch$|s$/i rule applies -> "quyses"
    // Original regex: /[^aeiou]y$|quy$/i - "quys" does NOT end in "quy", so quy rule doesn't match
    // Mutated regex: /[^aeiou]y$|quy/i - "quys" CONTAINS "quy", so mutant incorrectly applies ies rule -> "quies"
    const result = plural('quys')
    expect(result).toBe('quyses')
  })
})