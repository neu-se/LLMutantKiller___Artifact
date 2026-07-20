import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher mutation test', () => {
  it('should return null for paths ending with slash', () => {
    const matcher = Matcher.for('/test/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});