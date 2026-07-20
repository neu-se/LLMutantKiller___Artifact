import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle optional segments in path matching', () => {
    const matcher = Matcher.for('/a/*');
    expect(matcher.test('/a/x')).toBe(true);
    expect(matcher.test('/a/')).toBe(false);
  });
});