import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when compiling a matcher with an invalid spec', () => {
    const spec = '/+/';
    expect(() => new Matcher(spec, '1.1')).toThrowError('Path must not end with a slash');
    const spec2 = '/+';
    const matcher = new Matcher(spec2, '1.1');
    const result = matcher[Symbol.match]('/');
    expect(result).toBeNull();
  });
});