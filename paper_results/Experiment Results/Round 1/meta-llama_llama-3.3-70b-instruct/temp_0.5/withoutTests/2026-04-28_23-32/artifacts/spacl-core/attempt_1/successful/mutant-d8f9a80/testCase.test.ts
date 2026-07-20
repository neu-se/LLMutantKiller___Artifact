import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error with a specific message when creating a new Matcher instance with a path that does not begin with a slash', () => {
    expect(() => new Matcher('path')).toThrowError('Path must begin with a slash');
  });
});