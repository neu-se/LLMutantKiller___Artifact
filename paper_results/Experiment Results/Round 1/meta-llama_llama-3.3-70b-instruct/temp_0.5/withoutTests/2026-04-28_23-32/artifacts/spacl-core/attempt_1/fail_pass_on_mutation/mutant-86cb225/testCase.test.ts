import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error for a path with malformed wildcards in the original code but not in the mutated code', () => {
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.0')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.1')).toThrowError('Path contains malformed wildcards');
  });
});