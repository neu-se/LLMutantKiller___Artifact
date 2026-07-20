import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher'

describe('Matcher wildcard validation', () => {
  it('should reject malformed wildcard patterns with incorrect placement', () => {
    // This test targets the mutation by checking a pattern that should be rejected
    // The original regex correctly rejects patterns like "/+/" (wildcard followed by slash)
    // The mutated regex incorrectly accepts this pattern because it changed [^/] to [/]
    expect(() => {
      new Matcher('/+/')
    }).toThrow('Path contains malformed wildcards')
  })
})