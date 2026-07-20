import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return a non-null result when string does not end with a slash', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/path');
    expect(result).not.toBeNull();
  });
});