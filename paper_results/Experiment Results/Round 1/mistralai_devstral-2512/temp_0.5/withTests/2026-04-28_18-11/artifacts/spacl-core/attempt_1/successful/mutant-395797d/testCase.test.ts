import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";
import { describe, it, expect } from '@jest/globals';

describe('Matcher empty segments validation', () => {
  it('should throw an error with a specific message for paths with empty segments', () => {
    expect(() => {
      Matcher.for('//');
    }).toThrow('Path contains empty segments');
  });
});