import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher optional segment compilation', () => {
  it('should correctly compile patterns with optional segments when min=0', () => {
    const matcher = Matcher.for('/++/foo')
    expect('/foo').toMatch(matcher)
    expect('/bar/foo').toMatch(matcher)
    expect('/bar/baz/foo').not.toMatch(matcher)
    expect('/').not.toMatch(matcher)
    expect('/bar').not.toMatch(matcher)
  })
})