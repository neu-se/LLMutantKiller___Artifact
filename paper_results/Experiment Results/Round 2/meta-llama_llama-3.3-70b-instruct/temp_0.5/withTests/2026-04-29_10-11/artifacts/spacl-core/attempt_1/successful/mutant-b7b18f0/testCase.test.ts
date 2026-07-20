import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error for paths with malformed wildcards', () => {
    const spec = '/+*';
    expect(() => new Matcher(spec)).toThrowError('Path contains malformed wildcards');
  });
});