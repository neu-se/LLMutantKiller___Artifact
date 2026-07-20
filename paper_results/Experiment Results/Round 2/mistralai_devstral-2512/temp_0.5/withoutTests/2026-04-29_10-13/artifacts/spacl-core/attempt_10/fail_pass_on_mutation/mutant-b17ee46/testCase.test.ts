import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should handle wildcard patterns correctly with default version', () => {
    const matcher = Matcher.for('/test/*/path');
    expect(matcher.spec).toBe('/test/*/path');
    expect(matcher.test('/test/abc/path')).toBe(true);
    expect(matcher.test('/test/abc/def')).toBe(false);
  });
});