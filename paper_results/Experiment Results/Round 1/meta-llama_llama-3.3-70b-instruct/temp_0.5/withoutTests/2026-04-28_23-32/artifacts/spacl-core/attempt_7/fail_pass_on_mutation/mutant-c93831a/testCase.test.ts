import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not always return null', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('/');
    const result2 = matcher[Symbol.match]('/path/');
    expect(result1).not.toBeNull();
    expect(result2).toBeNull();
  });
});