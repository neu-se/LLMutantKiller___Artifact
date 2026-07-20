import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when matching a path that ends with a slash', () => {
    const matcher = Matcher.for('/test/**');
    const result = matcher[Symbol.match]('/test/path/');
    expect(result).toBeNull();
  });
});