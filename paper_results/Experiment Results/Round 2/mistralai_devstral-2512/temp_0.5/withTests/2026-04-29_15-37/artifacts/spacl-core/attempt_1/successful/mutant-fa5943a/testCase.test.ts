import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it, expect } from '@jest/globals';

describe('Matcher invalid characters error message', () => {
  it('should throw an error with descriptive message for invalid characters', () => {
    expect(() => {
      Matcher.for('/invalid@path');
    }).toThrow('Path contains invalid characters');
  });
});