import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher distinguishes original from mutated opt flag', () => {
  it('should match "/" with a spec that has only optional wildcards "/**"', () => {
    const matcher = Matcher.for('/**', '1.1')
    // Test the underlying regex source to understand what's happening
    const source = matcher.source
    // Then test actual matching
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
    // Also verify non-root paths still match
    expect('/a'.match(matcher)).not.toBeNull()
    expect('/a/b/c'.match(matcher)).not.toBeNull()
  })
})