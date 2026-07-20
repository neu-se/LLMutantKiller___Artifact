import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash and return null when string does not end with a slash but is not matched by the regex', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    const result2 = matcher[Symbol.match]('test');
    expect(result1).toBeNull();
    expect(result2).toBeNull();
  });
});