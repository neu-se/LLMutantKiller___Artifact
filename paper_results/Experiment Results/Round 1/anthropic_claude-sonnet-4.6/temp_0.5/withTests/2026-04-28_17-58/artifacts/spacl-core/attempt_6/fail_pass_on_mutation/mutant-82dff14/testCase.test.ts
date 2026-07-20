import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('constructor default version parameter should be 1.1', () => {
    // Extract the default value from the constructor's toString()
    // This directly observes the default parameter value
    const constructorStr = Matcher.toString()
    // The constructor source should contain '1.1' as the default, not empty string
    expect(constructorStr).toContain("= '1.1'")
  })
})