import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('should match root path "/" with "/**" spec', () => {
    const matcher = new Matcher('/**')
    expect('/'.match(matcher)).not.toBeNull()
  })
})