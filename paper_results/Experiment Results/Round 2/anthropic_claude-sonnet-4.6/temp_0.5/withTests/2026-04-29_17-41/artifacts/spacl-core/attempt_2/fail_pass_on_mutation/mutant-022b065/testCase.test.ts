import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('correctly validates the root path spec without false trailing slash error', () => {
    // The root path '/' should be accepted - it ends with '/' but it IS '/'
    // The trailing slash check uses /^.+\/$/ which requires at least one char BEFORE the trailing slash
    // So '/' should not be caught by this check
    expect(() => new Matcher('/')).not.toThrow()
  })
})