import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should accept a path with a slash in the middle but not at the end', () => {
    expect(() => {
      new Matcher('/a/b');
    }).not.toThrow();
  });
});