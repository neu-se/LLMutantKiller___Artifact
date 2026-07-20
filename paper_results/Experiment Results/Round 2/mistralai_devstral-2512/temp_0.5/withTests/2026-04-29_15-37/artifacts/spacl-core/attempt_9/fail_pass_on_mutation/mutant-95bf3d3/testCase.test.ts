import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment edge case', () => {
  it('should correctly handle empty path with optional wildcard when min=0 and final=true', () => {
    const matcher = Matcher.for('/++')
    expect('').not.toMatch(matcher)
    expect('/').toMatch(matcher)
    expect('/foo').toMatch(matcher)
    expect('/foo/bar').not.toMatch(matcher)
    expect('/foo/').not.toMatch(matcher)
  })
})