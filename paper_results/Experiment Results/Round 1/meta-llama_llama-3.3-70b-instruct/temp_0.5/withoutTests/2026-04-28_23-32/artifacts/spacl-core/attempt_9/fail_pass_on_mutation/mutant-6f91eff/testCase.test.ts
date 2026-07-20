import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error for a path with a specific malformed wildcard', () => {
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
  });
});