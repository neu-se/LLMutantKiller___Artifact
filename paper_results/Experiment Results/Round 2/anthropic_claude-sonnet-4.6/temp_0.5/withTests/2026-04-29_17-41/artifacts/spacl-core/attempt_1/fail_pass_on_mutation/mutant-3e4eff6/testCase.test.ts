import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('matcher mutation detection', () => {
  it('should match root path "/" with "/**" spec when min is 0 and opt should remain true', () => {
    const matcher = Matcher.for('/**')
    // The root path "/" should match "/**" because ** means zero or more segments
    // In the original code, when min < 1, the else-if (min > 0) branch is NOT taken,
    // so opt remains true, and the regex includes "^/$|^" allowing "/" to match.
    // In the mutated code, else-if (true) is always taken, setting opt=false,
    // so the regex does NOT include "^/$|^" and "/" fails to match.
    expect('/'.match(matcher)).not.toBeNull()
  })
})