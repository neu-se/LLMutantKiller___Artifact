import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash and return a non-null value when string does not end with a slash', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    const result2 = matcher[Symbol.match]('/test');
    expect(result1).toBeNull();
    expect(result2).not.toBeNull();
    const result3 = matcher[Symbol.match]('/test/');
    expect(result3).toBeNull();
  });
});