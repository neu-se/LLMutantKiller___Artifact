import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher error message validation', () => {
  it('should throw an error with descriptive message for malformed wildcards', () => {
    expect(() => {
      Matcher.for('/+*');
    }).toThrow('Path contains malformed wildcards');
  });
});