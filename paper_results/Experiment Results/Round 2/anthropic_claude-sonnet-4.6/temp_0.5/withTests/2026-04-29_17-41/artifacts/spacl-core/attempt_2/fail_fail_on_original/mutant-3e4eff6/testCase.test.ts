import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../src/matcher'

describe('matcher mutation detection', () => {
  it('should match root path "/" with "/++" spec', () => {
    const matcher = Matcher.for('/++')
    expect('/'.match(matcher)).not.toBeNull()
  })
})