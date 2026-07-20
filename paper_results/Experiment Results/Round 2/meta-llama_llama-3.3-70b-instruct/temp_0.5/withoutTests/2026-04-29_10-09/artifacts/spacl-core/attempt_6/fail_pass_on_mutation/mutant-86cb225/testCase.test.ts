import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error when path contains malformed wildcards', () => {
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+a')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/b*a')).toThrowError('Path contains malformed wildcards');
  });
});