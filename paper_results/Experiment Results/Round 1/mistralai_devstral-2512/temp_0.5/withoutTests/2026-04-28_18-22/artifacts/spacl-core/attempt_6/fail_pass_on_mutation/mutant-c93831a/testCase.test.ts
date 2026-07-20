import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null for empty path after slash', () => {
    const matcher = Matcher.for('/test/*');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});