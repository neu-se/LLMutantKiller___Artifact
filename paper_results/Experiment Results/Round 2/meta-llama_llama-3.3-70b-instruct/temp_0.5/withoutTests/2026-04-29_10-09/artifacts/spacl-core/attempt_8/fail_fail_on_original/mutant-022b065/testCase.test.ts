import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when the path is an empty string followed by a slash', () => {
    expect(() => new Matcher('/ ', '1.1')).toThrowError('Path must not end with a slash');
    expect(() => new Matcher('/', '1.1')).toThrowError('Path must not end with a slash');
  });
});