import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards in version 1.1', () => {
    // Test a pattern that should be rejected due to malformed wildcards
    // The original regex /[*+][^/]|[^/][*+]/ correctly rejects patterns like "/*x"
    // The mutated regex /[*+][/]|[^/][*+]/ incorrectly allows such patterns
    expect(() => {
      new Matcher('/*x', '1.1');
    }).toThrow('Path contains malformed wildcards');
  });
});