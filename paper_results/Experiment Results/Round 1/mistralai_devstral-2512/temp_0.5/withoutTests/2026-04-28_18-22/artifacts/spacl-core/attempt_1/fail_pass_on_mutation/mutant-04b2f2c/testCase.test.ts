import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should return null when matching a path that ends with a slash', () => {
    const matcher = new Matcher('/test');
    expect(matcher[Symbol.match]('/test/')).toBeNull();
  });
});