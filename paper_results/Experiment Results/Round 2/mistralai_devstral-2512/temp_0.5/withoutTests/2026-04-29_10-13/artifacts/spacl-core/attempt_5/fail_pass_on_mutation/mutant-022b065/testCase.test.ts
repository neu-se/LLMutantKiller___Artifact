import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error for a path that starts with a slash and has multiple segments ending with a slash', () => {
    expect(() => {
      new Matcher('/a/b/');
    }).toThrow('Path must not end with a slash');
  });
});