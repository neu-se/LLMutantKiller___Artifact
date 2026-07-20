import { Matcher } from '../../../../../../../../../../../subject_repositories/spacl-core/src/matcher';

describe('Matcher', () => {
  it('should match path specification with minimum occurrence of 0', () => {
    const matcher = new Matcher('/a*');
    expect(matcher.test('/')).toBe(false);
  });
});