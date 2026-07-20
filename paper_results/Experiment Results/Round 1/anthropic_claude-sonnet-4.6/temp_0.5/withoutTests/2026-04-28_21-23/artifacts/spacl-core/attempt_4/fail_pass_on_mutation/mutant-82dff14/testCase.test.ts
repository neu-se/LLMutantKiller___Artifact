import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"

describe('Matcher', () => {
  it('should have a valid default version parameter that satisfies the type constraint', () => {
    // The constructor signature declares version: '1' | '1.0' | '1.1'
    // The original default '1.1' satisfies this constraint
    // The mutated default '' does NOT satisfy this constraint
    // ts-jest type checking should reject the mutated code
    // This test verifies the module compiles and works correctly
    const m1 = new Matcher('/foo')
    const m2 = Matcher.for('/foo')
    // Both should produce identical behavior since Matcher.for passes '1.1' explicitly
    // and the original constructor defaults to '1.1'
    expect(m1.source).toBe(m2.source)
    expect(m1.test('/foo')).toBe(true)
    expect(m1.test('/bar')).toBe(false)
  })
})