import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards where a non-wildcard character precedes a wildcard', () => {
    expect(() => {
      Matcher.for('/a+');
    }).toThrow('Path contains malformed wildcards');
  });
});