import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher class', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => new Matcher('/', '')).toThrowError('Path contains invalid characters');
  });
});