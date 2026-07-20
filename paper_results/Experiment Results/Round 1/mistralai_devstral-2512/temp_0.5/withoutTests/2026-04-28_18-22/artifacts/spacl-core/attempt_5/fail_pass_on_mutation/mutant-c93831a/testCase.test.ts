import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null when matching string ends with slash', () => {
    const matcher = Matcher.for('/test/**');
    const result = matcher[Symbol.match]('/test/subpath/');
    expect(result).toBeNull();
  });
});