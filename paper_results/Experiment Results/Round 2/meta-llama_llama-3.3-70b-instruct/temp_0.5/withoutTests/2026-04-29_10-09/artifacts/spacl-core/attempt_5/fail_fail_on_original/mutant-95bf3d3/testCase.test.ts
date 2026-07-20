import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match path specification with minimum occurrence of 0', () => {
    const matcher = new Matcher('/a*');
    const originalMatcher = new Matcher('/a*');
    expect(originalMatcher.test('/a')).toBeTruthy();
    expect(matcher.test('/')).toBeTruthy();
  });
});