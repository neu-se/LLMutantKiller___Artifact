import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for paths containing a forward slash followed by a wildcard in version 1', () => {
    expect(() => new Matcher('/a/+/', '1')).toThrowError('Path contains malformed wildcards');
    expect(() => new Matcher('/a/*/', '1')).toThrowError('Path contains malformed wildcards');
  });
});