import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null when matching string ends with slash and has length > 1', () => {
    const matcher = Matcher.for('/a/*');
    const result = matcher[Symbol.match]('/a/');
    expect(result).toBeNull();
  });
});