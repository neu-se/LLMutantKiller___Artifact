import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher static constructor', () => {
  it('should throw error when version is empty string and path contains wildcards', () => {
    expect(() => {
      Matcher.for('/test/*/path', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});