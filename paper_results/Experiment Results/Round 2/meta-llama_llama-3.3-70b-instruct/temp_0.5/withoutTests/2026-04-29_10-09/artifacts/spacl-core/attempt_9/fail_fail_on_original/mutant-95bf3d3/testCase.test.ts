import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match path specification', () => {
    const matcher = new Matcher('/a');
    expect(matcher.test('/a')).toBeTruthy();
    const invalidMatcher = new Matcher('/a*', '1');
    expect(() => invalidMatcher.test('/')).toThrowError('Path contains malformed wildcards');
  });
});