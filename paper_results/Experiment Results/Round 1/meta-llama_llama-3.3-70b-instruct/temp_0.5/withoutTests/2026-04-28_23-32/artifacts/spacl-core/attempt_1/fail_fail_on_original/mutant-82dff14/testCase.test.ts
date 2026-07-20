import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is not provided', () => {
    expect(() => new Matcher('/path', '')).toThrowError('Path contains invalid characters');
  });
});