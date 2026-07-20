import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards where a non-slash character is followed by a wildcard', () => {
    expect(() => {
      Matcher.for('/a+');
    }).toThrow('Path contains malformed wildcards');
  });
});