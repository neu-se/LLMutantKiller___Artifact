import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash and not match', () => {
    const matcher = new Matcher('/');
    const string = '/foo/';
    expect(string.match(matcher)).toBeNull();
    const stringWithoutSlash = '/foo';
    expect(stringWithoutSlash.match(matcher)).not.toBeNull();
    const matcher2 = new Matcher('/');
    const string2 = '/foo/';
    if (string2.match(matcher2) === null) {
      expect(true).toBe(true);
    } else {
      expect(true).toBe(false);
    }
  });
});