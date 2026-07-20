import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when the path contains empty segments', () => {
    expect(() => new Matcher('//')).toThrowError('Path contains empty segments');
  });
});