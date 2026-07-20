import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when the path does not start with a slash', () => {
    expect(() => new Matcher('')).not.toThrowError();
  });
});