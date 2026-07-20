import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});