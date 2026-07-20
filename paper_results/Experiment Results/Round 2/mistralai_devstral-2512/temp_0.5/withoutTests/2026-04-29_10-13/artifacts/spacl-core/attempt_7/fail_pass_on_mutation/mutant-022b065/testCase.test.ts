import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a path that ends with a slash after multiple segments', () => {
    expect(() => {
      new Matcher('/a/b/c/');
    }).toThrow('Path must not end with a slash');
  });
});