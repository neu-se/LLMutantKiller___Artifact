import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should return null when string ends with a slash in original code but not null in mutated code', () => {
    const matcher = new Matcher('/');
    const resultOriginal = matcher[Symbol.match]('/test/');
    const resultMutated = matcher[Symbol.match]('/test/');
    expect(resultOriginal).toBeNull();
    expect(resultMutated).not.toBeNull();
  });
});