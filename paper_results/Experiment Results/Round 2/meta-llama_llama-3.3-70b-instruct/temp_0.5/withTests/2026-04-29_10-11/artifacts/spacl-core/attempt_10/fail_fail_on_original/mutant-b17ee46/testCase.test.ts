import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error when an empty version is provided', () => {
    expect(() => Matcher.for('/', '')).toThrowError('Path contains invalid characters');
  });
});