import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with * followed by + in version 1.1', () => {
    expect(() => {
      new Matcher('/a*+', '1.1');
    }).toThrow('Path contains malformed wildcards');
  });
});