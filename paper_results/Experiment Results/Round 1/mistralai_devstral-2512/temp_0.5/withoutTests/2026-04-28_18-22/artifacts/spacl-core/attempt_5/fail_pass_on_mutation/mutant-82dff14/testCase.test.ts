import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor default version', () => {
  it('should use version 1.1 when no version is specified', () => {
    const matcher = new Matcher('/test');
    expect(matcher.spec).toBe('/test');
  });
});