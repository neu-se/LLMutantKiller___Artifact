import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for a path with a forward slash followed by an asterisk', () => {
    expect(() => new Matcher('/a/*')).not.toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/+/b')).not.toThrowError('Path contains malformed wildcards');
  });
});