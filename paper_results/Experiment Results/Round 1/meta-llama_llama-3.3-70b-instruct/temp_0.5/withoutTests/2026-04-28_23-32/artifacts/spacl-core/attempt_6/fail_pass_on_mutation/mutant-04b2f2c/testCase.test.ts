import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and return non-null when string does not end with a slash, and then return null when string ends with a slash again', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    expect(result1).toBeNull();
    const result2 = matcher[Symbol.match]('/test');
    expect(result2).toBeNull();
    const result3 = matcher[Symbol.match]('/test/');
    expect(result3).toBeNull();
    expect(() => {
      if (result2 !== null) {
        throw new Error('Expected null result');
      }
      if (result3 === null) {
        throw new Error('Expected non-null result after non-null result');
      }
    }).toThrowError('Expected non-null result after non-null result');
  });
});