import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and has a length greater than 1', () => {
    const matcher = new Matcher('/');
    const result = matcher[Symbol.match]('path/');
    expect(result).toBeNull();
    const result2 = matcher[Symbol.match]('path');
    expect(result2).not.toBeNull();
    expect(() => {
      const result3 = matcher[Symbol.match]('path/');
      expect(result3).toBeNull();
      if (result3 !== null) {
        throw new Error('Matcher should return null for strings ending with a slash');
      }
    }).not.toThrow();
  });
});