import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher static constructor', () => {
  it('should throw error when version is empty string', () => {
    expect(() => {
      Matcher.for('/some/path', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});