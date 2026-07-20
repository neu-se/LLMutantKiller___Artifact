import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when path ends with a slash', () => {
    expect(() => new Matcher('/')).not.toThrowError('Path must not end with a slash');
  });
});