import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when input ends with slash and has length > 1', () => {
    const matcher = Matcher.for('/test/*');
    const result = matcher[Symbol.match]('/test/abc/');
    expect(result).toBeNull();
  });
});