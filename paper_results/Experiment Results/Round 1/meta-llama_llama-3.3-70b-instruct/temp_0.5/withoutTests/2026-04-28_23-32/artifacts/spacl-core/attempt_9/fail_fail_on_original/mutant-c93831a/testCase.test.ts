import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return different results for strings that end with and do not end with a slash', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/path/');
    const result2 = matcher[Symbol.match]('/path');
    expect(result1).not.toBe(result2);
  });
});