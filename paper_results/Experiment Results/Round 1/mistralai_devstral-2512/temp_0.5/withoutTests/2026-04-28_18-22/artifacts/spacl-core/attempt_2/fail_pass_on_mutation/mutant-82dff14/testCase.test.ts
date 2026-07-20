import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should use default version when not specified', () => {
    const matcher = new Matcher('/test');
    expect(matcher.spec).toBe('/test');
  });
});