import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher version parameter behavior', () => {
  it('should handle version parameter correctly', () => {
    const matcher1 = Matcher.for('/test');
    const matcher2 = Matcher.for('/test', '1.1');
    expect(matcher1.spec).toBe(matcher2.spec);
  });
});