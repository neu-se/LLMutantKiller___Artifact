import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher version parameter validation', () => {
  it('should accept valid version parameter', () => {
    const matcher = new Matcher('/test', '1.1');
    expect(matcher.spec).toBe('/test');
  });
});