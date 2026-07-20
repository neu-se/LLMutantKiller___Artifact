import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher optional wildcard behavior', () => {
  it('should match root path "/" with spec "/**" in version 1.1', () => {
    const matcher = Matcher.for('/**', '1.1')
    // Original: opt stays true when min=0, regex is '^/$|^(?:/[^/]+)*$', matches '/'
    // Mutated: opt forced false, regex is '^(?:/[^/]+)*$', does NOT match '/'
    const result = '/'.match(matcher)
    expect(result).not.toBeNull()
  })
})