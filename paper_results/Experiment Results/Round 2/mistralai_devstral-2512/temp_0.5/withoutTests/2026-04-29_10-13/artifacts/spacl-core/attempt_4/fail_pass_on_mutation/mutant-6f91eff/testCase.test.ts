import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards when * is followed by *', () => {
    expect(() => {
      new Matcher('/a**');
    }).toThrow('Path contains malformed wildcards');
  });
});