import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher', () => {
  it('rejects paths with non-slash characters immediately preceding wildcards', () => {
    expect(() => Matcher.for('/foo*')).toThrow('Path contains malformed wildcards')
  })
})