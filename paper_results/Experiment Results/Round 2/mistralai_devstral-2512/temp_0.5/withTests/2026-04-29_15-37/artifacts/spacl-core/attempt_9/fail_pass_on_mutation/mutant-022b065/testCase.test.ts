import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher trailing slash validation', () => {
  it('should reject paths with trailing slash', () => {
    // The mutation changes the regex from /^.+\/$/ to /.+\/$/
    // The original requires at least one character before the trailing slash
    // The mutated version would incorrectly allow paths like "/a/" which should be rejected

    // This test case should pass on original (throws error) but fail on mutated (doesn't throw)
    expect(() => {
      new Matcher('/a/');
    }).toThrow('Path must not end with a slash');
  });
});