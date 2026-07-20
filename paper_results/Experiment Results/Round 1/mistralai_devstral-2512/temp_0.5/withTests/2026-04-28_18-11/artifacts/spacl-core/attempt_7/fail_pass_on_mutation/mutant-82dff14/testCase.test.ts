import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor version parameter', () => {
  it('should accept valid path with default version 1.1', () => {
    const matcher = new Matcher('/test');
    expect(matcher.spec).toBe('/test');
  });
});