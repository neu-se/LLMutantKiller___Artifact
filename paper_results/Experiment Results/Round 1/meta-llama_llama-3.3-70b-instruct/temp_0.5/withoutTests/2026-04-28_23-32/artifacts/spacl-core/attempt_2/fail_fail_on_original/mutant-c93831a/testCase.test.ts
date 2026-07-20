import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and has a length greater than 1', () => {
    const matcher = new Matcher('/');
    const originalResult = matcher[Symbol.match]('/path/');
    const matcherMutated = new Matcher('/');
    const mutatedResult = matcherMutated[Symbol.match]('/path/');
    expect(originalResult).toBeNull();
    expect(mutatedResult).not.toBeNull();
  });
});