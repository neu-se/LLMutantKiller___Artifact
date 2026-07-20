import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle path specifications with optional segments', () => {
    const matcher = Matcher.for('/a/*', '1');
    expect(matcher.test('/a')).toBe(true);
    expect(matcher.test('/a/b')).toBe(true);
  });
});