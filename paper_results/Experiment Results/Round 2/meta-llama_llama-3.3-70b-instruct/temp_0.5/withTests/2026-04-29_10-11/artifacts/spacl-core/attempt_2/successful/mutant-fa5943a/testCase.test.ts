import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error with a descriptive message when creating a matcher with an invalid character', () => {
    const invalidPath = '/ ';
    expect(() => new Matcher(invalidPath)).toThrowError('Path contains invalid characters');
  });
});