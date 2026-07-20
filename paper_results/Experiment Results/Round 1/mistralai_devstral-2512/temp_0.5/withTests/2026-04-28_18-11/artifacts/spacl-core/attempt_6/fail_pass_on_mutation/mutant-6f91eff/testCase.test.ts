import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards like "/+e"', () => {
    expect(() => {
      Matcher.for('/+e');
    }).toThrow('Path contains malformed wildcards');
  });
});