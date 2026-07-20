import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('should match root path "/" with "/++" spec', () => {
    const matcher = Matcher.for('/++')
    // /++ means zero or one segment, so "/" should match
    // Original: opt stays true when min===0, so regex includes "^/$|^" allowing "/" to match
    // Mutated: opt is set to false always, so regex does NOT include "^/$|^" and "/" fails to match
    expect('/'.match(matcher)).not.toBeNull()
  })
})