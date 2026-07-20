import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('should correctly handle capture with single character name', () => {
    // With /:.+/, ':x' matches (x is 1 char, satisfies 1+)
    // With /:./, ':x' matches (x is 1 char, satisfies exactly 1 in substring)
    // These are equivalent... 
    // BUT what about opt=false interaction?
    const matcher = new Matcher('/+/:id')
    expect(matcher.props).toEqual(['id'])
    // /+/:id should match /a/b, /a/b/c etc but not /a
    expect('/a/b'.match(matcher)).not.toBeNull()
    expect('/a'.match(matcher)).toBeNull()
    expect('/a/b'.match(matcher)![1]).toBe('b')
  })
})