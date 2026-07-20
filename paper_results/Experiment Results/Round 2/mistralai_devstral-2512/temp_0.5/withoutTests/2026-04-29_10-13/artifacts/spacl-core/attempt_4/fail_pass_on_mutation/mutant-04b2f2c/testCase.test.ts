import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should return null for paths ending with slash when length > 1', () => {
    const matcher = new Matcher('/:prop');
    const result = matcher[Symbol.match]('/value/');
    expect(result).toBeNull();
  });
});