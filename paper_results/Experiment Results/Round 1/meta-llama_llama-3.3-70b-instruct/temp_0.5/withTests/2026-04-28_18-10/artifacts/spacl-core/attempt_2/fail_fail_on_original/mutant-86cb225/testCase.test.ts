import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should detect the mutation in the Matcher class', () => {
    const matcher = new Matcher('/foo+*', '1.1');
    expect(() => matcher).toThrowError('Path contains malformed wildcards');
  });
});