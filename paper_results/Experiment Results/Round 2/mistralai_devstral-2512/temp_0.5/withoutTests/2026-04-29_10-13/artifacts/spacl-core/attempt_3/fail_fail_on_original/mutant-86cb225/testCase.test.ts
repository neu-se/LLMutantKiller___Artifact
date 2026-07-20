import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher wildcard validation', () => {
  it('should accept paths with valid wildcard patterns containing * after /', () => {
    expect(() => new Matcher('/a*')).not.toThrow();
  });
});