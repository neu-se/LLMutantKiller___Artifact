import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher wildcard validation', () => {
  it('should throw an error with descriptive message for malformed wildcards', () => {
    expect(() => {
      Matcher.for('/+*');
    }).toThrow('Path contains malformed wildcards');
  });
});