import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should accept paths with wildcards followed by non-wildcard characters', () => {
    expect(() => {
      Matcher.for('/+x');
    }).not.toThrow();
  });
});