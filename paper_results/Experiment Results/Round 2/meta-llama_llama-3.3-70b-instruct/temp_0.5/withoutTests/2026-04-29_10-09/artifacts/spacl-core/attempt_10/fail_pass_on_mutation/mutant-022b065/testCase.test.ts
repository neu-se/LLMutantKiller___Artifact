import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when the path is a string that ends with a slash and has a length greater than 1', () => {
    expect(() => new Matcher('/a/', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/', '1.1')).not.toThrowError('Path must not end with a slash');
  });
});