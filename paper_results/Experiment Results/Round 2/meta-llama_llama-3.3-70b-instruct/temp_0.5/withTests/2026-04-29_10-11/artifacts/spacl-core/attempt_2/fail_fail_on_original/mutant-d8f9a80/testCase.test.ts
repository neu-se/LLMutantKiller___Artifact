import { Matcher } from '../src/matcher';
import { describe, it, expect } from '@jest/globals';

describe('Matcher', () => {
  it('should throw an error when the path does not start with a slash in the original code but not throw an error in the mutated code', () => {
    expect(() => {
      try {
        new Matcher('');
      } catch (error) {
        if (error.message === '') {
          throw new Error('Expected error message to be "Path must begin with a slash" but got ""');
        }
      }
    }).toThrowError('Expected error message to be "Path must begin with a slash" but got ""');
  });
});