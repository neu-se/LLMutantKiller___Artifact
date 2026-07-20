import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle optional segments with zero minimum at the end', () => {
    const matcher = Matcher.for('/a/**');
    expect(matcher.test('/a/')).toBe(true);
    expect(matcher.test('/a/x')).toBe(true);
    expect(matcher.test('/a/x/y')).toBe(true);
  });
});