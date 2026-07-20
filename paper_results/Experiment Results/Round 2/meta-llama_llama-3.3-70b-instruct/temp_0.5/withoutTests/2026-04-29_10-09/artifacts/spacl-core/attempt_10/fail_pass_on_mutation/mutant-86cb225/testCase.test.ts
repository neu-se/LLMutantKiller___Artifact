import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should not throw an error when path contains valid wildcards in the original code', () => {
    expect(() => new Matcher('/a')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/b')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+a')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/b*a')).toThrowError('Path contains malformed wildcards');
  });
});