import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error when version is an empty string', () => {
    expect(() => new Matcher('/path', '')).toThrowError('Path contains invalid characters');
    expect(() => new Matcher('/path', '1.1')).not.toThrowError();
  });
});