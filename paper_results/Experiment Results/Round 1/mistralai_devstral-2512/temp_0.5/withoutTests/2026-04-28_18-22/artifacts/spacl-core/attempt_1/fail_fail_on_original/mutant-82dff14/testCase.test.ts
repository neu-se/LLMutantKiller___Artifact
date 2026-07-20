import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor', () => {
  it('should throw an error when version is not a valid string', () => {
    expect(() => {
      new Matcher('/test', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});