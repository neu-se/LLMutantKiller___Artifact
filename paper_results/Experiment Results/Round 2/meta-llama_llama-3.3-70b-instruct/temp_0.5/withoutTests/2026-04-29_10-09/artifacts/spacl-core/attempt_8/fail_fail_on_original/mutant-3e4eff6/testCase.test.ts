import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with optional segments', () => {
    const matcher = Matcher.for('/a/*', '1.1');
    expect(matcher.test('/a')).toBe(false);
    expect(matcher.test('/a/b')).toBe(true);
    expect(matcher.test('/a/b/c')).toBe(false);
    const matcher2 = Matcher.for('/a/*', '1.1');
    expect(matcher2.test('/a')).toBe(false);
  });
});