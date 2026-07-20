import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards in version 1.1', () => {
    // This test case should pass in the original code but fail in the mutated code
    // The mutation changes the regex pattern for version 1.1 from /[*+][^/]|[^/][*+]/
    // to /[*+][/]|[^/][*+]/ which incorrectly allows patterns like "/*/" that should be rejected
    expect(() => {
      new Matcher('/*/', '1.1');
    }).toThrow('Path contains malformed wildcards');
  });
});