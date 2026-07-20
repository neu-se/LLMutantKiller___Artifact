import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher"
import { describe, it, expect } from '@jest/globals'

describe('Matcher wildcard behavior', () => {
  it('should correctly handle optional segments with min=0', () => {
    const matcher = Matcher.for('/**/foo')
    expect('/foo').toMatch(matcher)
    expect('/bar/foo').toMatch(matcher)
    expect('/bar/baz/foo').toMatch(matcher)
    expect('/').not.toMatch(matcher)
    expect('/bar').not.toMatch(matcher)
  })
})