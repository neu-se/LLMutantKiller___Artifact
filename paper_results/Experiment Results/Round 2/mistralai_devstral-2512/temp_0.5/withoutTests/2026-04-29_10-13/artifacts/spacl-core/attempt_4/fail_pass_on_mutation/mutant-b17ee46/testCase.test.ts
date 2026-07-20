import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should use version 1.1 as default when version is empty string', () => {
    const matcher = Matcher.for('/test/*/path', '' as any);
    expect(matcher.spec).toBe('/test/*/path');
    expect(matcher.props).toEqual([]);
  });
});