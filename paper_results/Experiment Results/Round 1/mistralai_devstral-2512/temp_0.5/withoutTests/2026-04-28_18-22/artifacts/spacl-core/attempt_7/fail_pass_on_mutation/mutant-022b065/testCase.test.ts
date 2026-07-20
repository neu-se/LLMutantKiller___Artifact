import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher constructor', () => {
  it('should throw an error when path is exactly "/"', () => {
    expect(() => {
      new Matcher('/a/');
    }).toThrow('Path must not end with a slash');
  });
});