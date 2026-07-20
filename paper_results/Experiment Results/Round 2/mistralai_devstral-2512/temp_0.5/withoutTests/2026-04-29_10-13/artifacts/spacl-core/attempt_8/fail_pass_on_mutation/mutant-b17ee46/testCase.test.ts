import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should use version 1.1 when no version is specified', () => {
    const matcher = Matcher.for('/test/*/path');
    expect(matcher.spec).toBe('/test/*/path');
    // This test passes on original (version 1.1) but fails on mutant (version "")
    // because the mutant would throw "Path contains malformed wildcards" error
  });
});