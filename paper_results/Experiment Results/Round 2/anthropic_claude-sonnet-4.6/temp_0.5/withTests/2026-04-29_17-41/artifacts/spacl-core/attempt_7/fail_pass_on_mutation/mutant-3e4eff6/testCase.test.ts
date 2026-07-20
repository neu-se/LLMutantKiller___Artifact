import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('correctly compiles /++/++ to match "/" but not "/foo/bar"', () => {
    const matcher = Matcher.for('/++/++')
    // With /++/++: two optional segments
    // Reversed segments: ['++', '++']
    // First '++': max=1, min=0
    // Second '++': max=2, min=0  (still in same flatten group since no default case)
    // flatten(true): final=true, opt=true, min=0 < 1
    // Original: else if (min > 0) → false, opt stays true → regex has ^/$|^ prefix
    // Mutated: else if (true) → opt=false → regex has only ^^ prefix, no ^/$
    // So '/' should match original but not mutated
    // Original regex would be: ^\/$|^(?:\/[^/]+){0,2}$  or similar
    // Mutated regex would be: ^(?:\/[^/]+){0,2}$
    // ^(?:\/[^/]+){0,2}$ matches '' (empty) but not '/'
    expect('/'.match(matcher)).not.toBeNull()
    expect('/foo/bar/boo'.match(matcher)).toBeNull()
  })
})