import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('accepts spec /foo~bar without throwing trailing slash error', () => {
    expect(() => new Matcher('/foo~bar')).not.toThrow()
    const m = new Matcher('/foo~bar')
    expect(m.spec).toBe('/foo~bar')
  })
})