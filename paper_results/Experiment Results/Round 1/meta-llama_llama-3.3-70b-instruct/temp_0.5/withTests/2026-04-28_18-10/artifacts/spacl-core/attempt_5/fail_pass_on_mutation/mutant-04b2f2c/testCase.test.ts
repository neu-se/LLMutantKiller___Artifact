import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash and not match', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo/';
    expect(string.match(matcher)).toBeNull();
    const stringWithoutSlash = '/bar';
    expect(stringWithoutSlash.match(matcher)).toBeNull();
    const stringWithSlashAndNotMatch = '/bar/';
    expect(stringWithSlashAndNotMatch.match(matcher)).toBeNull();
    const stringWithoutSlashAndMatch = '/foo';
    expect(stringWithoutSlashAndMatch.match(matcher)).not.toBeNull();
  });
});