import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should accept version 1.1 as default parameter', () => {
    const matcher = Matcher.for('/test/*/path');
    expect(matcher).toBeInstanceOf(Matcher);
    expect(matcher.spec).toBe('/test/*/path');
  });
});