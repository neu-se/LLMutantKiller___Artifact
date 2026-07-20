import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher mutation test', () => {
  it('should return null for exact path match ending with slash', () => {
    const matcher = Matcher.for('/exact');
    const result = matcher[Symbol.match]('/exact/');
    expect(result).toBeNull();
  });
});