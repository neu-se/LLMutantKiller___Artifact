import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should return null when matching a path with trailing slash', () => {
    const matcher = new Matcher('/test');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});