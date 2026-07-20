import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('should compile and correctly match paths using default version 1.1', () => {
    // The mutation introduces a TypeScript type error in matcher.ts by setting
    // the default value of `version` to "" which is not assignable to '1'|'1.0'|'1.1'.
    // ts-jest will fail to compile the mutated source file, causing this test to fail.
    // On the original code, this compiles and runs correctly.
    const m = Matcher.for('/foo')
    expect(m.test('/foo')).toBe(true)
  })
})