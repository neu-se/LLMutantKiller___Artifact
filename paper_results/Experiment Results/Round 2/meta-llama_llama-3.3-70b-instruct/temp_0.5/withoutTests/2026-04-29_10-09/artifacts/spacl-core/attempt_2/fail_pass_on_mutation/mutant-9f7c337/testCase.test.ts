import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should not throw an error for paths containing a forward slash followed by a wildcard', () => {
    expect(() => new Matcher('/a/+')).not.toThrowError('Path contains malformed wildcards');
  });
});