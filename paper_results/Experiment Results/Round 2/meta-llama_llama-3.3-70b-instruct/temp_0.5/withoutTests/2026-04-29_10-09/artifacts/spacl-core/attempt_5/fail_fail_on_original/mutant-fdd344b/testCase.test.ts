import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a path containing malformed wildcards', () => {
    expect(() => new Matcher('/a*/+')).not.toThrowError('Path contains malformed wildcards');
  });
});