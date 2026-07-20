import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error when path contains valid wildcards in the mutated code', () => {
    expect(() => new Matcher('/a')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/b*a')).not.toThrowError('Path contains malformed wildcards');
  });
});