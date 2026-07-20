import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error when path ends with a slash', () => {
    expect(() => {
      new Matcher('/a/');
    }).toThrow('Path must not end with a slash');
  });
});