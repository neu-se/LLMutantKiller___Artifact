import { describe, it, expect } from '@jest/globals'
import { Matcher } from '../../src/matcher'

describe('Matcher wildcard validation', () => {
  it('should accept a valid path spec where wildcard appears before a slash separator', () => {
    // /foo/*/bar contains "*/" which the mutated regex [*+][/] would incorrectly flag
    // Original regex [*+][^/] only flags wildcards followed by NON-slash chars
    expect(() => Matcher.for('/foo/*/bar')).not.toThrow()
  })
})