import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with invalid wildcard patterns where * follows a non-slash character', () => {
    expect(() => {
      new Matcher('/a*b');
    }).toThrow('Path contains malformed wildcards');
  });
});