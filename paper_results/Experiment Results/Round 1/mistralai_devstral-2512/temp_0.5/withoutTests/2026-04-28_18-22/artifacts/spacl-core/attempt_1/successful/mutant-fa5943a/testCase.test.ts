import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher invalid characters', () => {
  it('should throw an error with a descriptive message when path contains invalid characters', () => {
    expect(() => {
      new Matcher('/invalid@path');
    }).toThrow('Path contains invalid characters');
  });
});