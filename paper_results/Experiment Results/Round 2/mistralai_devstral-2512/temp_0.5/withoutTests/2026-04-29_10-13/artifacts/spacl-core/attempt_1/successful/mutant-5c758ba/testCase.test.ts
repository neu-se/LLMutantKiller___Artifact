import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher path validation', () => {
  it('should throw an error with specific message when path ends with a slash', () => {
    expect(() => {
      new Matcher('/test/');
    }).toThrow('Path must not end with a slash');
  });
});