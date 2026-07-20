import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor version parameter', () => {
  it('should use version 1.1 as default when no version is specified', () => {
    const matcher = new Matcher('/test');
    expect(matcher.spec).toBe('/test');
  });
});