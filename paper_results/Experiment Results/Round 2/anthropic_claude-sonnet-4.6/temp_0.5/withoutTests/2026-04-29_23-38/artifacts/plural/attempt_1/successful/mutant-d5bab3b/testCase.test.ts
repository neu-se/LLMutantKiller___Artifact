import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not pluralize words that start with "man" but are not exactly "man" or "woman"', () => {
    // The original regex /^(?:wo)?man$/i only matches "man" or "woman" exactly
    // The mutated regex /^(?:wo)?man/i matches any word starting with "man" or "woman"
    // So "manager" would be incorrectly transformed by the mutated code
    // but should just get the default 's' suffix in the original
    const result = plural('manager')
    expect(result).toBe('managers')
  })
})