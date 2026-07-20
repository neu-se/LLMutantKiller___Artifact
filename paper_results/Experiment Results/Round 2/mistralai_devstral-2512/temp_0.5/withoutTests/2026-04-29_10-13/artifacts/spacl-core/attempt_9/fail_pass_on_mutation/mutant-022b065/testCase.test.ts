import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should accept a path with multiple segments that does not end with a slash', () => {
    expect(() => {
      new Matcher('/a/b/c');
    }).not.toThrow();
  });
});