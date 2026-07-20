import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should not throw an error for a path with a specific wildcard pattern', () => {
    expect(() => new Matcher('/a')).not.toThrowError('Path contains malformed wildcards');
  });
});