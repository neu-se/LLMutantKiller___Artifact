import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts'

describe('Matcher wildcard validation', () => {
  it('rejects paths where a non-slash character precedes a wildcard', () => {
    expect(() => Matcher.for('/foo*')).toThrow('Path contains malformed wildcards')
  })
})