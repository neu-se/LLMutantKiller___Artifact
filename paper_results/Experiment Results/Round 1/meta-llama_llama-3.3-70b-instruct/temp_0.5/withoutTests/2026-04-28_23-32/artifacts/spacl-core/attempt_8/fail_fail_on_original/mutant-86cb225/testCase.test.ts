import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should not throw an error for a path with a specific wildcard pattern', () => {
    expect(() => new Matcher('/a*b', '1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.0')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b', '1.1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b+')).not.toThrowError('Path contains malformed wildcards');
  });
});