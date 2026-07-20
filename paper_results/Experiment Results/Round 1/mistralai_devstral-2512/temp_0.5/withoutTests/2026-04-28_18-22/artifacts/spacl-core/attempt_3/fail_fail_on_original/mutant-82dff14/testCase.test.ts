import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should throw error when version is empty string', () => {
    expect(() => {
      Matcher.for('/test', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});