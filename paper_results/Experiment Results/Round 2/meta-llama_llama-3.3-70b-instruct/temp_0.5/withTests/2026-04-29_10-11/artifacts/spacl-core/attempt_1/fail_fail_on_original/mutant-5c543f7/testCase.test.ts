import { Matcher } from '../../../src/matcher';
import { describe, it } from '@jest/globals';
import { strictEqual } from 'assert';

describe('Matcher', () => {
  it('should reject path spec with malformed captures', () => {
    const spec = '/:a:b';
    expect(() => Matcher.for(spec)).toThrowError('Path contains malformed captures');
  });
});