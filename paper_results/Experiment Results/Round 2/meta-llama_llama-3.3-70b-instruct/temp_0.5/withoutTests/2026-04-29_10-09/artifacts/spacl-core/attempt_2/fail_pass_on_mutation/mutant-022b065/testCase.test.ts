import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not throw an error when the path is empty', () => {
    expect(() => new Matcher('/', '1.1')).not.toThrowError('Path must not end with a slash');
  });
});