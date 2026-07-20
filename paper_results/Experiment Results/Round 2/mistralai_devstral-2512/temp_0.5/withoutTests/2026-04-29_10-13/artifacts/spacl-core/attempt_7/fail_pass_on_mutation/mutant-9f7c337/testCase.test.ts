import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher wildcard validation', () => {
  it('should reject paths with malformed wildcards when wildcard is preceded by slash in version 1.1', () => {
    expect(() => {
      new Matcher('/a*', '1.1');
    }).toThrow('Path contains malformed wildcards');
  });
});