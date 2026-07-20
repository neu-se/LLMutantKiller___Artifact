import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should not throw an error for a path with a specific valid wildcard', () => {
    expect(() => new Matcher('/a+b')).toThrowError('Path contains malformed wildcards');
  });
});