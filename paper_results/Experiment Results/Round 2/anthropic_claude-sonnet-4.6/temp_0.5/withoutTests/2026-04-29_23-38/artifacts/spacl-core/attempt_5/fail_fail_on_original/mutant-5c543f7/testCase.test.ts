import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should not treat a path segment starting with colon followed by one char as different from multi-char capture', () => {
    // Both /:a and /:ab should be captures - verify props and matching behavior
    const m1 = new Matcher('/:a')
    const m2 = new Matcher('/:ab')
    
    // Both should have exactly one prop
    expect(m1.props).toHaveLength(1)
    expect(m2.props).toHaveLength(1)
    
    // The literal string ':a' should NOT match /:a (it should match dynamic segments)
    expect('/hello'.match(m1)).not.toBeNull()
    expect('/hello'.match(m2)).not.toBeNull()
    
    // A literal path that looks like a capture name should not match as literal
    const literalMatcher = new Matcher('/:a')
    expect('/:a'.match(literalMatcher)).toBeNull()
  })
})