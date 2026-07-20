import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and then return non-null when string does not end with a slash', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    expect(result1).toBeNull();
    const result2 = matcher[Symbol.match]('/test');
    expect(result2).not.toBeNull();
  });
});