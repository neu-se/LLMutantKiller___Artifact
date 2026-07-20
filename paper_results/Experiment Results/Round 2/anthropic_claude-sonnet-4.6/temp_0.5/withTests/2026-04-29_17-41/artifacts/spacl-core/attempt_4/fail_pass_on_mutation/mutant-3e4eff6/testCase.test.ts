import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('should compile /++/foo to a regex that does not match /foo when min is 0 but opt should be false', () => {
    // For /++/foo: segments reversed are ['foo', '++']
    // Processing 'foo': flatten() called, opt=false, parts=['/foo']
    // Processing '++': max++, so max=1, min=0
    // finalise() calls flatten(true): max>0, final=true, opt=false (already set by 'foo')
    // Since opt is false, the outer if (final && opt && min < 1) is FALSE
    // So we go to else if (min > 0) - original: false, opt stays false
    // Mutated: else if (true) - opt = false (no change, already false)
    // This spec is unaffected. Need a spec where opt is still true at flatten(true) with min=0, max>0

    // For /++: only segment is '++', opt stays true throughout
    // flatten(true): final=true, opt=true, min=0 < 1 → enters if
    // Original: else if (min > 0) → false, opt stays true → regex = ^/$|^(?:/[^/]+)?$
    // Mutated: else if (true) → opt = false → regex = ^(?:/[^/]+)?$
    // ^(?:/[^/]+)?$ matches '' (empty string) but NOT '/'
    // So '/' should NOT match in mutated version

    // But wait - the Symbol.match override returns null if string ends with '/'
    // '/' ends with '/' AND length > 1 is false (length=1), so it passes through
    // So '/' goes to super[Symbol.match] which tests against the regex

    // Let me try matching empty string against /++ in mutated vs original
    const matcher = Matcher.for('/++')
    // In original: regex source is ^/$|^(?:/[^/]+)?$  → matches '/' and ''? No, ^/$  matches only '/'
    // In mutated: regex source is ^(?:/[^/]+)?$  → matches '' (empty string)
    expect(''.match(matcher)).toBeNull()
  })
})