import { describe, it } from '@jest/globals';
import { Matcher } from '../../../src/matcher';

describe('Matcher', () => {
  it('should throw an error when creating a matcher with an invalid character', () => {
    expect(() => new Matcher('/ ')).toThrowError('Path contains invalid characters');
  });
});