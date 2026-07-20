import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher', () => {
  it('compiles /++ correctly', () => {
    const matcher = new Matcher('/++')
    expect(matcher.source).toBe('^\\/$|^\\/[^/]+$')
  })
})