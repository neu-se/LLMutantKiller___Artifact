import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when trying to access the match property directly after calling match on a string that ends with a slash', () => {
    const matcher = new Matcher('/');
    matcher[Symbol.match]('/test/');
    expect(() => {
      matcher[Symbol.match]('/test/');
    }).toThrowError();
  });
});