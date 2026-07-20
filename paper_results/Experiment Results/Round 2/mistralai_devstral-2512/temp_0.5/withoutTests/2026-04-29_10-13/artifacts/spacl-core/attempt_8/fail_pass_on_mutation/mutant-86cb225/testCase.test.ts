import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher wildcard validation', () => {
  it('should reject paths with invalid wildcard patterns where * is preceded by non-slash and followed by non-slash', () => {
    expect(() => new Matcher('/a*b')).toThrow('Path contains malformed wildcards');
  });
});