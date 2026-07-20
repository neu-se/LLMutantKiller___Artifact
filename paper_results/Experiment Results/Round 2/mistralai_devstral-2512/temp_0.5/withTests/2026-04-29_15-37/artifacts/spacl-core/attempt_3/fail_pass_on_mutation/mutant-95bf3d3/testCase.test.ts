import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment behavior', () => {
  it('should reject empty path when optional segment has min=0', () => {
    const matcher = Matcher.for('/**')
    expect('').not.toMatch(matcher)
    expect('/').toMatch(matcher)
    expect('/foo').toMatch(matcher)
  })
})