import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should correctly handle spec with only wildcards and no captures', () => {
    // Test that ** (any depth wildcard) works correctly
    // and that props remains empty (no captures)
    const matcher = new Matcher('/**')
    expect(matcher.props).toEqual([])
    // Should match root
    expect('/'.match(matcher)).not.toBeNull()
    // Should match any path
    expect('/foo'.match(matcher)).not.toBeNull()
    expect('/foo/bar'.match(matcher)).not.toBeNull()
    // Verify no capture groups in result
    const result = '/foo'.match(matcher)
    expect(result).toHaveLength(1)
  })
})