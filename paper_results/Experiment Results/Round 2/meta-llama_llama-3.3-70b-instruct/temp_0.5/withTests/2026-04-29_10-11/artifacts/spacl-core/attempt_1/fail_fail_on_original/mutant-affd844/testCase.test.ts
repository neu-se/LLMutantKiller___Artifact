import { Matcher } from '../../../src/matcher';
import { describe, it } from '@jest/globals';

describe('matcher', () => {
  it('rejects paths with malformed captures', () => {
    expect(() => Matcher.for('/:')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/::')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/:foo:')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/:foo+')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/:foo*')).toThrowError('Path contains malformed captures');
    expect(() => Matcher.for('/foo:')).toThrowError('Path contains malformed captures');
  });
});