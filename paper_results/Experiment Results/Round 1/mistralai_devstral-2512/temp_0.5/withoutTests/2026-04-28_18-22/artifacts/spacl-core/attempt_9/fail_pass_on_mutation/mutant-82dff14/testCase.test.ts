import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor version parameter', () => {
  it('should use default version when called without version parameter', () => {
    const matcher = new Matcher('/test');
    expect(matcher.spec).toBe('/test');
  });
});