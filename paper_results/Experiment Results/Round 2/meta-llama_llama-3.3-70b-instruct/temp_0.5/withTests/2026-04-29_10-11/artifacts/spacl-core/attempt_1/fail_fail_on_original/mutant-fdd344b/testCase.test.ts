import { Matcher } from '../../../../../src/matcher';
import { describe, it } from '@jest/globals';

describe('matcher', () => {
  it('rejects paths with malformed wildcards', () => {
    expect(() => Matcher.for('/+[/]')).toThrowError('Path contains malformed wildcards');
    expect(() => Matcher.for('[*+]/')).toThrowError('Path contains malformed wildcards');
  });
});