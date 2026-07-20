import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return a non-null result for a string that matches the pattern', () => {
    const matcher = new Matcher('/path');
    const result = matcher[Symbol.match]('/path');
    expect(result).not.toBeNull();
  });
});