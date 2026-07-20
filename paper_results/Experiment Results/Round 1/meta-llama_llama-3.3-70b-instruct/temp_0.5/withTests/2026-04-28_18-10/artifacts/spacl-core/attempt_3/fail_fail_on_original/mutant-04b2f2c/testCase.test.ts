import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash', () => {
    const matcher = new Matcher('/');
    const string = '/foo/';
    expect(string.match(matcher)).toBeNull();
    const stringWithoutSlash = '/foo';
    expect(stringWithoutSlash.match(matcher)).not.toBeNull();
  });
});