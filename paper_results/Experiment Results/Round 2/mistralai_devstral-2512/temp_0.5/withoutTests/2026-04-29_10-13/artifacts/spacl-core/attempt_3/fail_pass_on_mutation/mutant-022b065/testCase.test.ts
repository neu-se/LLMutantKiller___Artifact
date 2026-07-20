import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error for a path that starts and ends with a slash', () => {
    expect(() => {
      new Matcher('/a/');
    }).toThrow('Path must not end with a slash');
  });
});