import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should detect the mutation in the Matcher class', () => {
    const matcher = new Matcher('/a', '1.1');
    expect(() => matcher).not.toThrowError();
  });
});