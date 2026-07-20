import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should return null for paths ending with slash when length > 1', () => {
    const matcher = new Matcher('/test');
    const result = matcher[Symbol.match]('/test/');
    expect(result).toBeNull();
    expect(result).toBeDefined();
  });
});