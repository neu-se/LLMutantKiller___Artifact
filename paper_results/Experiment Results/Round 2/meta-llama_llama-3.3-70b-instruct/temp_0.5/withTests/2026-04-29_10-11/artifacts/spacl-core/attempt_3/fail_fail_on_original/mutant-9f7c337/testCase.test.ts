import { describe, it } from '@jest/globals';
import { Matcher } from '../../src/matcher';

describe('Matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    expect(() => Matcher.for('/[/+*]')).toThrowError('Path contains malformed wildcards');
  });
});