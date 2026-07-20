import { Matcher } from '../../../src/matcher';
import { describe, it } from '@jest/globals';

describe('matcher', () => {
  it('rejects paths with invalid characters in spec', () => {
    expect(() => Matcher.for('/ ')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/!')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/@')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/#')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/%')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/^')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/&')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/(')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/)')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/=')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/{')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/}')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/[')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/]')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/<')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/>')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/|')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/?')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/,')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/;')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/`')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/"')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for("/'")).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/\\')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/\n')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/\r')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/\t')).toThrowError('Path contains invalid characters');
    expect(() => Matcher.for('/\0')).toThrowError('Path contains invalid characters');
  });
});