import { describe, it } from '@jest/globals';
import { Matcher } from '../../src/matcher';

describe('Matcher', () => {
  it('detects mutation in path validation', () => {
    expect(() => new Matcher('/+/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/+/foo/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/*/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/*/foo/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/foo/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/foo/+/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/foo/*/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/foo/bar/', '1.1')).toThrowError('Path must not end with a slash');
  });
});