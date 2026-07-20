import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and has a length greater than 1', () => {
    const matcher = new Matcher('/path');
    const result = matcher[Symbol.match]('/path/');
    expect(result).toBeNull();
  });
});