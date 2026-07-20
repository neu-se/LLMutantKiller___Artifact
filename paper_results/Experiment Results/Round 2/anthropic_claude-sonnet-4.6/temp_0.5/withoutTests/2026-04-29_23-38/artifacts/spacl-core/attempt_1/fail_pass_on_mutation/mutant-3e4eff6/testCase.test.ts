import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher with optional wildcard at end', () => {
  it('should match root path "/" when spec ends with optional wildcard like "/foo/**"', () => {
    // With spec "/foo/**", the ** is zero-or-more segments
    // When the wildcard is optional (min=0) and at the end, opt should remain true
    // This means "/" should also match (the '^/$|^' prefix in the regex)
    // The mutation changes opt to false, making "/" not match
    const matcher = Matcher.for('/**')
    const result = '/' .match(matcher)
    expect(result).not.toBeNull()
  })
})