import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher wildcard validation', () => {
  it('should accept paths with valid wildcard patterns where * follows a slash and is followed by non-slash', () => {
    expect(() => new Matcher('/a/*b')).not.toThrow();
  });
});