import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error for a path that ends with a slash but has no other characters', () => {
    expect(() => {
      new Matcher('/');
    }).toThrow('Path must not end with a slash');
  });
});