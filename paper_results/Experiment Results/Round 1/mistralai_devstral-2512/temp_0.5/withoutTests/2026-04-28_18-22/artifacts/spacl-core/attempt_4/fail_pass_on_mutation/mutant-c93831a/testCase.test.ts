import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should handle paths ending with slash in match operation', () => {
    const matcher = Matcher.for('/test/*');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});