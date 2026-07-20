import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when the path is a single character', () => {
    expect(() => new Matcher('a', '1.1')).toThrowError('Path must begin with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must not end with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must not end with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('a/', '1.1')).not.toThrowError('Path must begin with a slash');
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
  });
});