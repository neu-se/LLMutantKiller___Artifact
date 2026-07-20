import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor', () => {
  it('should throw an error when path ends with a slash', () => {
    expect(() => {
      new Matcher('/test/');
    }).toThrow('Path must not end with a slash');
  });
});