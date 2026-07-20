import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error for path with empty segments', () => {
    expect(() => new Matcher('/a//b')).toThrowError('Path contains empty segments');
  });
});