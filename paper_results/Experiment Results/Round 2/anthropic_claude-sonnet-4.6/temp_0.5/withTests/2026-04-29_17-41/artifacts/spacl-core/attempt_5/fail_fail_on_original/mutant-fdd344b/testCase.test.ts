import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('should accept a valid path spec where wildcard segment is followed by another segment', () => {
    // /foo/*/bar contains "*/" - mutated regex [*+][/] would incorrectly flag this as malformed
    // Original regex [*+][^/] only flags wildcards followed by non-slash chars, so this is valid
    expect(() => Matcher.for('/foo/*/bar')).not.toThrow()
  })
})