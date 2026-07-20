import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains invalid characters', () => {
    const spec = '/path/with$invalid/characters';
    const originalError = new Error('Path contains invalid characters');
    const mutatedError = new Error('');
    expect(() => new Matcher(spec)).toThrowError(originalError.message);
  });
});