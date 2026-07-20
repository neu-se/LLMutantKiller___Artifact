import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
    const result2 = matcher[Symbol.match]('/test');
    expect(result2).not.toBeNull();
    expect(() => {
      const result3 = matcher[Symbol.match]('/test/');
      if (result3 === null) {
        throw new Error('Expected non-null result');
      }
    }).not.toThrow();
  });
});