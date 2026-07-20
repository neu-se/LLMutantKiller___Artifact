import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when an invalid version is provided', () => {
    expect(() => Matcher.for('/', '1.2')).toThrowError('Path contains invalid characters');
  });
});