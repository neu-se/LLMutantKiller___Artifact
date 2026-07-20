import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match paths correctly', () => {
    const matcher = new Matcher('/foo');
    const string = '/foo/';
    expect(() => matcher[Symbol.match](string)).toThrowError('Path must not end with a slash');
  });
});