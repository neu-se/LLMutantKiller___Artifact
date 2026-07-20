import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher constructor', () => {
  it('should throw an error with a specific message when path does not begin with a slash', () => {
    expect(() => {
      new Matcher('invalidPath');
    }).toThrow('Path must begin with a slash');
  });
});