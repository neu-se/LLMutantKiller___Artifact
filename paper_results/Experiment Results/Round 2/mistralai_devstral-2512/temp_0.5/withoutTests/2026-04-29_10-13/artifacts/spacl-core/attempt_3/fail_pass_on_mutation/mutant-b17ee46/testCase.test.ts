import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should use default version 1.1 when not specified', () => {
    const matcher = Matcher.for('/some/path');
    expect(matcher.spec).toBe('/some/path');
    expect(matcher.props).toEqual([]);
  });
});