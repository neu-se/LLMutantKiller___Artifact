import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('constructs with default version producing correct match behavior for version 1.1 features', () => {
    // This test imports and uses Matcher, which causes ts-jest to compile matcher.ts.
    // The mutation changes the default parameter value from '1.1' to "" which is
    // not assignable to the type '1' | '1.0' | '1.1', causing a TypeScript compile error.
    const m = new Matcher('/foo')
    expect(m.test('/foo')).toBe(true)
    expect(m.test('/bar')).toBe(false)
  })
})