import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should create matcher with version 1.1 when no version specified', () => {
    const matcher = Matcher.for('/test/**/path');
    expect(matcher.spec).toBe('/test/**/path');
    expect(matcher.props).toEqual([]);
  });
});