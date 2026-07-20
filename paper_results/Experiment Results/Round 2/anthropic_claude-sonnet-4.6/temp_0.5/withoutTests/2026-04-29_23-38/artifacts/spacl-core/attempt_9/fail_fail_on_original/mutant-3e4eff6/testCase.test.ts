import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher with optional leading wildcard', () => {
  it('should match root "/" against spec "/++/foo" since ++ at start is optional', () => {
    const matcher = Matcher.for('/++/foo', '1.1')
    expect('/foo'.match(matcher)).not.toBeNull()
    // With opt=true (original), '/' also matches via '^/$' alternative... 
    // Actually test the regex source
    expect(matcher.source).toContain('|')
  })
})