import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor', () => {
  it('should throw an error when path is exactly "/"', () => {
    expect(() => {
      new Matcher('/');
    }).toThrow('Path must not end with a slash');
  });
});