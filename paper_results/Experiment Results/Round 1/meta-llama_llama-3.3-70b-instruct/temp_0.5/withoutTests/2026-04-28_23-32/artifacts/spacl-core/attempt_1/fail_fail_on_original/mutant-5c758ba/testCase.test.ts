import { Matcher } from '../../matcher';

describe('Matcher', () => {
  it('should throw an error when path ends with a slash', () => {
    expect(() => new Matcher('/path/')).toThrowError('Path must not end with a slash');
  });
});