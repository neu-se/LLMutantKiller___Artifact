import { describe, it } from '@jest/globals';
import { Matcher } from '../src/matcher';

describe('Matcher', () => {
  it('accepts paths with valid wildcards', () => {
    expect(() => Matcher.for('/[*+]')).not.toThrowError();
  });
});