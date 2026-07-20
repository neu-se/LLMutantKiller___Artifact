import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should return null for paths ending with slash when length > 1', () => {
    const matcher = new Matcher('/test');
    expect(matcher[Symbol.match]('/test/')).toBeNull();
    expect(matcher[Symbol.match]('/a/')).toBeNull();
  });
});