import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('throws trailing slash error for spec with trailing slash before newline', () => {
    // "/foo/\n" passes character validation ($ matches before trailing \n)
    // and should be rejected for having a trailing slash
    expect(() => new Matcher('/foo/\n')).toThrow('Path must not end with a slash')
  })
})