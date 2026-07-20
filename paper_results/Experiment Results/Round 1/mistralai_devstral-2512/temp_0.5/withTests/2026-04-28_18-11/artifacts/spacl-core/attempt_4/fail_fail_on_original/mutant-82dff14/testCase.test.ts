import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor version parameter', () => {
  it('should throw an error when version parameter is invalid', () => {
    expect(() => {
      new Matcher('/test', '' as any);
    }).toThrow('Path contains malformed wildcards');
  });
});