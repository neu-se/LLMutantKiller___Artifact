import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a path containing +*/ in the mutated code', () => {
    expect(() => new Matcher('/a*/+')).toThrowError('Path contains malformed wildcards');
  });
});