import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw when trying to access result after null check on mutated code', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
    expect(() => {
      if (result !== null) {
        throw new Error('Expected null result');
      }
      // On the mutated code, result should be an empty object, not null
      const _ = result && result[0];
    }).toThrowError('Cannot read properties of null (reading \'0\')');
  });
});