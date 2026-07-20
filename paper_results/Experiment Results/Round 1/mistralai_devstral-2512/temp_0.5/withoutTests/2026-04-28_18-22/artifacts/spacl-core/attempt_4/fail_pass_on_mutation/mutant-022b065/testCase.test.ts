import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should accept paths that are exactly "/"', () => {
    expect(() => {
      new Matcher('/');
    }).not.toThrow();
  });
});