import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher trailing slash validation', () => {
  it('should reject paths ending with a single slash after root', () => {
    // This test targets the mutation where the regex pattern was changed from
    // /^.+\/$/ (original) to /.+\/$/ (mutated)
    // The original pattern requires at least one character before the trailing slash
    // The mutated pattern could incorrectly match empty strings followed by slash

    // Test case that should pass in original but fail in mutated
    // The mutated version would incorrectly accept this path
    expect(() => {
      new Matcher('/a/');
    }).toThrow('Path must not end with a slash');

    // Additional test to ensure the mutation doesn't affect valid paths
    expect(() => {
      new Matcher('/a/b');
    }).not.toThrow();
  });
});