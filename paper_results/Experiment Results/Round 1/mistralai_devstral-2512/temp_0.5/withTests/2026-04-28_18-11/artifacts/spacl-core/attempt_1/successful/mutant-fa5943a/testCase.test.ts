import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher invalid character error message', () => {
  it('should throw an error with descriptive message for invalid characters', () => {
    expect(() => {
      new Matcher('/invalid@path');
    }).toThrow('Path contains invalid characters');
  });
});