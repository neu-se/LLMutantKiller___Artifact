import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should match correctly', () => {
    const matcher = new Matcher('/');
    const string = '/foo/';
    expect(string.match(matcher)).toBeNull();
  });
});