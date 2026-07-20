import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains invalid characters', () => {
    const spec = '/path/with$invalid/characters';
    expect(() => new Matcher(spec)).toThrowError();
    expect(() => new Matcher(spec)).not.toThrowError('Path must begin with a slash');
  });
});