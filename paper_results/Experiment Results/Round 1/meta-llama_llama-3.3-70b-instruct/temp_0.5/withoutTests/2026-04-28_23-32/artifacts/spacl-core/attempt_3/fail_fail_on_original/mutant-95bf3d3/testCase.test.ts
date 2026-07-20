import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should correctly handle the min value in the compile function', () => {
    const matcher = new Matcher('/a*');
    expect(matcher[Symbol.match]('/a')).not.toBeNull();
    expect(() => new Matcher('/a*+')).toThrowError('Path contains malformed wildcards');
  });
});