import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should accept valid version parameter', () => {
    const matcher = Matcher.for('/test', '1.1');
    expect(matcher.spec).toBe('/test');
  });
});