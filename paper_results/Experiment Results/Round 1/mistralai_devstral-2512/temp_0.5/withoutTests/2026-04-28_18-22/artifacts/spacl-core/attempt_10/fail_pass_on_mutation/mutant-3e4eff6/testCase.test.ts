import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle optional segments with zero minimum', () => {
    const matcher = Matcher.for('/a/**/b');
    expect(matcher.test('/a/b')).toBe(true);
    expect(matcher.test('/a/x/b')).toBe(true);
    expect(matcher.test('/a/x/y/b')).toBe(true);
    expect(matcher.test('/a/')).toBe(false);
    expect(matcher.test('/a/x')).toBe(false);
  });
});