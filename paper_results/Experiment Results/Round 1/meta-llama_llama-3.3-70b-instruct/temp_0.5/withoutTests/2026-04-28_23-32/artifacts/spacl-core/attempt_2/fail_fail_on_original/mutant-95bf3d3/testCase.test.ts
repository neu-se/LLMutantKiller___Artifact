import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly compile path specifications', () => {
    const matcher = new Matcher('/a+');
    expect(matcher[Symbol.match]('/a')).not.toBeNull();
    expect(matcher[Symbol.match]('/ab')).not.toBeNull();
    expect(matcher[Symbol.match]('/')).toBeNull();
  });
});