import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor version parameter', () => {
  it('should throw an error when using version 1 with match-many-or-none wildcards', () => {
    expect(() => {
      new Matcher('/**', '1');
    }).toThrow('Path contains malformed wildcards');
  });
});