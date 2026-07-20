import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should throw an error with descriptive message for malformed wildcards', () => {
    expect(() => {
      new Matcher('/a**b');
    }).toThrow('Path contains malformed wildcards');
  });
});