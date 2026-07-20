import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and has a length greater than 1, but not always return null', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/path/');
    const result2 = matcher[Symbol.match]('/path');
    expect(result1).toBeNull();
    expect(result2).not.toBe(result1);
  });
});