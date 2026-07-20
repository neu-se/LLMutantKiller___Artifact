import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment edge case', () => {
  it('should correctly handle empty segments in optional wildcards', () => {
    const matcher = Matcher.for('/**/foo')
    expect('/foo').toMatch(matcher)
    expect('/bar/foo').toMatch(matcher)
    expect('/bar/baz/foo').toMatch(matcher)
    expect('/').not.toMatch(matcher)
    expect('/bar').not.toMatch(matcher)
    expect('/bar/').not.toMatch(matcher)
  })
})