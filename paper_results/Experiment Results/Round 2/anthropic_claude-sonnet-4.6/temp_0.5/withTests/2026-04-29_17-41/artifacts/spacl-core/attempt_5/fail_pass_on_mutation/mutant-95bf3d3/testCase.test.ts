import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles /** to the correct regex source including root path alternative', () => {
    const matcher = new Matcher('/**')
    expect(matcher.source).toBe('^\\/$|^(?:\\/[^/]+)+$')
  })
})