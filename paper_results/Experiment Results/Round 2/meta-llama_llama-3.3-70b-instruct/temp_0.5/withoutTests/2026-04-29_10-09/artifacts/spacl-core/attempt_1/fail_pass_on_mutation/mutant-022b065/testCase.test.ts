import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when the path ends with a slash', () => {
    expect(() => new Matcher('/path/', '1.1')).toThrowError('Path must not end with a slash');
  });
});