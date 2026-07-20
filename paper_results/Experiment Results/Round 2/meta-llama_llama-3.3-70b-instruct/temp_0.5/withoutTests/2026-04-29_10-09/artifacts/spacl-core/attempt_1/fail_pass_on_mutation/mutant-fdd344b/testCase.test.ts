import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a path containing malformed wildcards', () => {
    expect(() => new Matcher('/a/*+')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a+*')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a*+/b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a+*/b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a**/b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a++/b')).toThrowError('Path contains malformed wildcards');
  });
});