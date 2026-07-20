import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural - quy rule mutation detection', () => {
  it('should not apply the -ies suffix to a word containing "quy" not at the end', () => {
    // "quying" contains "quy" but does not end with "quy"
    // No higher-priority rules match "quying"
    // Original regex: quy$ requires "quy" at end - no match, falls through to default -> "quyings"
    // Mutated regex: quy matches anywhere - incorrectly applies ies rule -> "quiing" or similar
    const result = plural('quying')
    // Original: no rule matches, appends 's' -> "quyings"
    expect(result).toBe('quyings')
  })
})