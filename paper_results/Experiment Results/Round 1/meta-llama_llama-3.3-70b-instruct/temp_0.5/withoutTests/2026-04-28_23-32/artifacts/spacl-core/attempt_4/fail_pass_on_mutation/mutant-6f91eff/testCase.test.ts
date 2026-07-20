import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error for a path with a specific malformed wildcard', () => {
    expect(() => new Matcher('/a*b', '1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.0')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.1')).toThrowError('Path contains malformed wildcards');
  });
});