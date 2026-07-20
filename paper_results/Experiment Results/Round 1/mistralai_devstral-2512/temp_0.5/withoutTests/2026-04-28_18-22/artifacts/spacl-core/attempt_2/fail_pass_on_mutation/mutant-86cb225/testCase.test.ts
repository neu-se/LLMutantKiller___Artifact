import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with invalid wildcard patterns starting with non-wildcard characters', () => {
    expect(() => {
      new Matcher('/a*b');
    }).toThrow('Path contains malformed wildcards');
  });
});