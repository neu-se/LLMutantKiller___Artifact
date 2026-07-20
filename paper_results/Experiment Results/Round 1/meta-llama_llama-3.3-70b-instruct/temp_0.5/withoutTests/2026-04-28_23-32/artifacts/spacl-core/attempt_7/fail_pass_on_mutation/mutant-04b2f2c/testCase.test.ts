import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw when trying to access result after null check', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
    expect(() => {
      if (result === null) {
        // This line should throw TypeError on mutated code
        const _ = result.length;
      }
    }).toThrowError('Cannot read properties of null (reading \'length\')');
  });
});