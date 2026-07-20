import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('accepts valid paths with wildcards after slashes', () => {
    expect(() => Matcher.for('/foo/*')).not.toThrow()
  })
})