import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with the correct message when the path contains empty segments', () => {
    expect(() => new Matcher('//a')).toThrowError('Path contains empty segments');
  });
});