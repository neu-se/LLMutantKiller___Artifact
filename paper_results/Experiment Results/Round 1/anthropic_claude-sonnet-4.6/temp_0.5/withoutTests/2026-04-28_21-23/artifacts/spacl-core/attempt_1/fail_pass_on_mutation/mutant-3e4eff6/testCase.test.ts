import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher with optional trailing wildcards', () => {
  it('should match root path "/" when spec has zero-or-more wildcard like "/**"', () => {
    const matcher = Matcher.for('/**', '1.1')
    // With original code: opt remains true when min=0, so regex includes ^/$|^ prefix
    // meaning "/" is matched
    // With mutated code: opt is forced to false, so "/" is NOT matched
    const result = '/' .match(matcher)
    expect(result).not.toBeNull()
  })
})