import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null when string ends with a slash and has a length greater than 1, and then return null again, and the second null should be different from the first null', () => {
    const matcher = new Matcher('/');
    const result1 = matcher[Symbol.match]('path/');
    expect(result1).toBeNull();
    const result2 = matcher[Symbol.match]('path/');
    expect(result2).toBeNull();
    expect(result1).not.toBe(result2);
  });
});