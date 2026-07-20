import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should detect the mutation in the Matcher class', () => {
    expect(() => new Matcher('/+a', '1.1')).not.toThrowError();
  });
});