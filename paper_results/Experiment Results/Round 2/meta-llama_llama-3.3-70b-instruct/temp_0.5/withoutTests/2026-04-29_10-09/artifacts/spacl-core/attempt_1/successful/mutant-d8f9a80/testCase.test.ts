import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher.ts";

describe('Matcher', () => {
  it('should throw an error when the path does not begin with a slash', () => {
    expect(() => new Matcher('path')).toThrowError('Path must begin with a slash');
  });
});