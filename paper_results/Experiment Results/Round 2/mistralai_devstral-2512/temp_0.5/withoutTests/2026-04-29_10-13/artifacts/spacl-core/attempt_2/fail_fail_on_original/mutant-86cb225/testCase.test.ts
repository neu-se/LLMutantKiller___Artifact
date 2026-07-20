import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher wildcard validation', () => {
  it('should accept paths with valid wildcard patterns starting with *', () => {
    expect(() => new Matcher('/*b')).not.toThrow();
  });
});