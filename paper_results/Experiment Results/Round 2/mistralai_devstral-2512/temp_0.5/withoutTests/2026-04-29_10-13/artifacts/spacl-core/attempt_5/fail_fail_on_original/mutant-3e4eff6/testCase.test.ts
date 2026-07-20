import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path with optional segment followed by required segment', () => {
    const matcher = new Matcher('/a/+b/c');
    expect(matcher.test('/a/b/c')).toBe(true);
    expect(matcher.test('/a/x/b/c')).toBe(true);
    expect(matcher.test('/a/c')).toBe(false);
    expect(matcher.test('/a/b')).toBe(false);
  });
});