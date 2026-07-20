import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor', () => {
  it('should accept paths that start with a slash but contain no other slashes', () => {
    expect(() => {
      new Matcher('/');
    }).not.toThrow();
  });
});