import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher source for spec with non-final zero-min wildcard', () => {
  it('regex source for "/**/++" should start with "^/$|" indicating opt=true', () => {
    const matcher = Matcher.for('/**/++', '1.1')
    // Original: opt stays true after non-final flatten → source starts with ^/$|
    // Mutated: opt forced false → source does NOT start with ^/$|
    expect(matcher.source.startsWith('^/$|')).toBe(true)
  })
})