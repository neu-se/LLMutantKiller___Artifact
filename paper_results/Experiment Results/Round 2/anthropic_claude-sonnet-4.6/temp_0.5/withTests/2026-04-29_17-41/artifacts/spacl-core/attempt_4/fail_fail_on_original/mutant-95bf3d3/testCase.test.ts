import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles /++ to the correct regex pattern that matches root path', () => {
    const matcher = new Matcher('/++')
    // The regex should include the ^/$| prefix to match root path
    expect(matcher.source).toBe('\\/$|^\\/[^/]+')
    // And should match root path
    expect('/'.match(matcher)).not.toBeNull()
  })
})