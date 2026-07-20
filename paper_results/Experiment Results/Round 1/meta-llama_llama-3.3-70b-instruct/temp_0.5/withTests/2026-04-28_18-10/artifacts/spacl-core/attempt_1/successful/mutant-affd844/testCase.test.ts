import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when path contains malformed captures', () => {
    expect(() => new Matcher('/:')).toThrowError('Path contains malformed captures');
  });
});