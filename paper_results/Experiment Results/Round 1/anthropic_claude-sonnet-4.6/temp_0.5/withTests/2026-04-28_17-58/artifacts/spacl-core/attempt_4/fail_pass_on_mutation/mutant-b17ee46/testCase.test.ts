import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher.for', () => {
  it('should be callable without a version argument and produce a working matcher', () => {
    // The original default is '1.1'. The mutated default is "" which is not a valid
    // value for the type '1' | '1.0' | '1.1', causing a TypeScript compilation error
    // when ts-jest compiles the mutated source file.
    // This test simply calls Matcher.for without a version to trigger that code path.
    expect(() => {
      const m = Matcher.for('/foo')
      '/foo'.match(m)
    }).not.toThrow()
  })
})