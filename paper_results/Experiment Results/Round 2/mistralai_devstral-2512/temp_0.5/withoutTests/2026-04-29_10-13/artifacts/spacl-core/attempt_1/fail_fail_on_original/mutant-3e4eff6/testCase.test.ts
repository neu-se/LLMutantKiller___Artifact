import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should correctly handle optional segments in path matching', () => {
    const matcher = new Matcher('/a/+b');
    expect(matcher.test('/a/b')).toBe(true);
    expect(matcher.test('/a/')).toBe(false);
  });
});