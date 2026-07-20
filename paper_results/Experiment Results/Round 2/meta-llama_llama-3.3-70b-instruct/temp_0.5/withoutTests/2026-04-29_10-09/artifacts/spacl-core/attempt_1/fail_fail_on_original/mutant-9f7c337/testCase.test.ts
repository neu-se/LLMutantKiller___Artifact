import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for paths containing malformed wildcards', () => {
    expect(() => new Matcher('/a/*b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/+b')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/*b', '1.1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/+b', '1.1')).toThrowError('Path contains malformed wildcards');
    // The mutated code will not throw an error for the following cases
    expect(() => new Matcher('/a/*b', '1')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/+b', '1')).not.toThrowError('Path contains malformed wildcards');
  });
});