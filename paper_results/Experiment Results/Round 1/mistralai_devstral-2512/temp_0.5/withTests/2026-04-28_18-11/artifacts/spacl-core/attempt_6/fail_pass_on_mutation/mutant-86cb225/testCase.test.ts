import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should reject paths with wildcards preceded by non-wildcard characters', () => {
    expect(() => {
      Matcher.for('/a*');
    }).toThrow('Path contains malformed wildcards');
  });
});