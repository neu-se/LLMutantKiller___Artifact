import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for a path with a forward slash followed by an asterisk and then another forward slash', () => {
    expect(() => new Matcher('/a/*/b')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+/a')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/+b')).not.toThrowError('Path contains malformed wildcards');
  });
});