import { describe, it, expect } from '@jest/globals';
import { Matcher } from '../../../src/matcher';

describe('Matcher', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => new Matcher('/foo', '')).toThrowError('Path specification language version must be one of "1", "1.0", or "1.1"');
  });
});