import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should accept a path that starts with a slash and has no other slashes', () => {
    expect(() => {
      new Matcher('/a');
    }).not.toThrow();
  });
});