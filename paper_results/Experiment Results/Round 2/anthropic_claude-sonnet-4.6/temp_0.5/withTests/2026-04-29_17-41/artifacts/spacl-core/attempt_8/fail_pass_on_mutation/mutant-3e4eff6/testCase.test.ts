import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('detects mutation via /++ regex source difference', () => {
    const matcher = Matcher.for('/++')
    // Original: opt=true, min=0, max=1 → regex = ^\/$|^\/[^/]+$
    // Mutated:  opt=false, min=0, max=1 → regex = ^(?:\/[^/]+)?$
    // ^(?:\/[^/]+)?$ matches empty string ''
    // ^\/$|^\/[^/]+$ does NOT match empty string ''
    expect(''.match(matcher)).toBeNull()
  })
})