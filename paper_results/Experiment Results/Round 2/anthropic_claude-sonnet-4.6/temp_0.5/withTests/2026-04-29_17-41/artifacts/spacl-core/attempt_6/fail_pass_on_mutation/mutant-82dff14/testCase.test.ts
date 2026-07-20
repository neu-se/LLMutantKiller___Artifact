import { describe, it, expect } from '@jest/globals'
import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts"

describe('Matcher', () => {
  it('constructor default produces same result as explicit version 1.1', () => {
    const withDefault = new Matcher('/foo/++')
    const withExplicit = new Matcher('/foo/++', '1.1')
    expect(withDefault.source).toBe(withExplicit.source)
    expect(withDefault.spec).toBe(withExplicit.spec)
    expect(withDefault.props).toEqual(withExplicit.props)
  })
})