import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and throw when trying to access result', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
    expect(() => {
      if (result !== null) {
        throw new Error('Expected null result');
      }
      const _ = result[0]; // This line should throw TypeError on original code
    }).toThrowError('Cannot read properties of null (reading \'0\')');
  });
});