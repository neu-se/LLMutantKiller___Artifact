import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for a path containing +*/', () => {
    expect(() => new Matcher('/a+*/')).toThrowError('Path contains malformed wildcards');
  });
});