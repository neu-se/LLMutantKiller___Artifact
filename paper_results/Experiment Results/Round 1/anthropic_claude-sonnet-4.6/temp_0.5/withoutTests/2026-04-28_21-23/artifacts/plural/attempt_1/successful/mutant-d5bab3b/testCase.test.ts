import plural from "../../../../../../../../../../../subject_repositories/plural/index.js"

describe('plural', () => {
  it('should not pluralize words that start with "man" but are not exactly "man" or "woman"', () => {
    // The original regex /^(?:wo)?man$/i only matches "man" or "woman" exactly
    // The mutated regex /^(?:wo)?man/i matches any word starting with "man" or "woman"
    // So "manifest" would be incorrectly pluralized by the mutated code
    const result = plural('manifest')
    // Original: "manifest" doesn't match /^(?:wo)?man$/i (no $ anchor), falls through to default -> "manifests"
    // Mutated: "manifest" matches /^(?:wo)?man/i -> "menifest" (replaces 'a' with 'e')
    expect(result).toBe('manifests')
  })
})