import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when matching a path ending with slash', () => {
    const matcher = Matcher.for('/test/*');
    const result = matcher[Symbol.match]('/test/abc/');
    expect(result).toBeNull();
  });
});