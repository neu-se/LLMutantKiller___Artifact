import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null for paths ending with slash when using Symbol.match', () => {
    const matcher = Matcher.for('/test/**');
    const result = matcher[Symbol.match]('/test/path/');
    expect(result).toBeNull();
  });
});