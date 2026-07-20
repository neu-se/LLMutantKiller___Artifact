import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when the path contains empty segments', () => {
    expect(() => new Matcher('/')).toThrowError('Path contains empty segments');
    expect(() => new Matcher('')).toThrowError('Path contains empty segments');
    expect(() => new Matcher('/a')).not.toThrowError();
  });
});