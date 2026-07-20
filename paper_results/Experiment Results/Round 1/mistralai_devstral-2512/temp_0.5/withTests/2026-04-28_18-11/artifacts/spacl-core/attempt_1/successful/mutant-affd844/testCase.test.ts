import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";
import { describe, it } from '@jest/globals';

describe('Matcher with malformed captures', () => {
  it('should throw an error with descriptive message for malformed captures', () => {
    expect(() => {
      Matcher.for('/:');
    }).toThrow('Path contains malformed captures');
  });
});