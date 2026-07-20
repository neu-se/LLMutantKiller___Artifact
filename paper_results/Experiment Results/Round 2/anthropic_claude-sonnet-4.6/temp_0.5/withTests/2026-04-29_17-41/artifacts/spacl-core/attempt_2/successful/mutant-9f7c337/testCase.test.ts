import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation for version 1', () => {
  it('rejects paths where a non-slash character immediately precedes a wildcard in version 1', () => {
    expect(() => Matcher.for('/foo*', '1')).toThrow('Path contains malformed wildcards')
  })
})