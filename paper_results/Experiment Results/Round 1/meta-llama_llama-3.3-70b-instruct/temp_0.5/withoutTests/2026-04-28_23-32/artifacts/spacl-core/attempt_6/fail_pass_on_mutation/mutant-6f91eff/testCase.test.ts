import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should throw an error for a path with a specific valid wildcard on the mutated code', () => {
    expect(() => new Matcher('/a*b', '1')).toThrowError('Path contains malformed wildcards');
  });
});