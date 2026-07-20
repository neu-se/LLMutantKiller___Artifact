import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards containing * after non-slash character in version 1', () => {
    expect(() => {
      new Matcher('/a*b', '1');
    }).toThrow('Path contains malformed wildcards');
  });
});