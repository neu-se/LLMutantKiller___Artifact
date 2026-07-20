import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null when input string ends with slash and length > 1', () => {
    const matcher = Matcher.for('/test/**');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
  });
});