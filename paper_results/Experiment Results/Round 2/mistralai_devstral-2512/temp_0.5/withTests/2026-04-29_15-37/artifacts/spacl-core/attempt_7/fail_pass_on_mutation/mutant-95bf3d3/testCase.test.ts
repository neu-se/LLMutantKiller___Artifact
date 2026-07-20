import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment behavior', () => {
  it('should correctly handle empty segments with optional wildcard when min=0', () => {
    const matcher = Matcher.for('/++/foo')
    expect('/foo').toMatch(matcher)
    expect('/bar/foo').toMatch(matcher)
    expect('/bar/baz/foo').not.toMatch(matcher)
    expect('/').not.toMatch(matcher)
    expect('/bar').not.toMatch(matcher)
    expect('/bar/').not.toMatch(matcher)
  })
})