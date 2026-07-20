import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match path specification', () => {
    const matcher = new Matcher('/a+');
    expect(() => new Matcher('/a+')).toThrowError('Path contains malformed wildcards');
  });
});