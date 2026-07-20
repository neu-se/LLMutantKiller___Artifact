import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return a non-null value when string does not end with a slash but the original code returns null for it', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    expect(result1).toBeNull();
    const result2 = matcher[Symbol.match]('/test');
    expect(result2).toBeNull();
    const result3 = matcher[Symbol.match]('/test/');
    expect(result3).toBeNull();
    const result4 = matcher[Symbol.match]('/test');
    expect(result4).not.toBeNull();
  });
});