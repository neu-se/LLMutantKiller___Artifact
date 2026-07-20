import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not throw an error when the path is a single slash', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError('Path must not end with a slash');
  });
});