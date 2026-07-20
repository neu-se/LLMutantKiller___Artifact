import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a meaningful message when path ends with a slash', () => {
    expect(() => new Matcher('/path/')).toThrowError('Path must not end with a slash');
  });
});