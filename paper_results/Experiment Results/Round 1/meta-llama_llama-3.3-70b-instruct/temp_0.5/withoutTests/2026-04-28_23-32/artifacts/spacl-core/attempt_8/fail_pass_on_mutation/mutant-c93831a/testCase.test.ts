import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return a non-null result for a string that does not end with a slash and has a length of 1', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/');
    expect(result).not.toBeNull();
  });
});