import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for a path with a forward slash before an asterisk', () => {
    expect(() => new Matcher('/a/+b')).not.toThrowError('Path contains malformed wildcards');
  });
});