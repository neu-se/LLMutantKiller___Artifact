import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and then return null when string does not end with a slash, and then throw when trying to access result', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/test/');
    expect(result1).toBeNull();
    const result2 = matcher[Symbol.match]('/test');
    expect(result2).toBeNull();
    expect(() => {
      if (result2 !== null) {
        throw new Error('Expected null result');
      }
      const _ = result2[0]; // This line should throw TypeError on original code
    }).toThrowError('Cannot read properties of null (reading \'0\')');
  });
});