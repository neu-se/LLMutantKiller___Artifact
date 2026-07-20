import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path with optional segment at the end', () => {
    const matcher = new Matcher('/a/*');
    expect(matcher.test('/a/')).toBe(false);
    expect(matcher.test('/a/b')).toBe(true);
    expect(matcher.test('/a/b/c')).toBe(false);
  });
});