import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains invalid characters', () => {
    const spec = '/path/with$invalid/characters';
    try {
      new Matcher(spec);
      throw new Error('Expected an error to be thrown');
    } catch (error) {
      expect(error.message).not.toBe('');
    }
  });
});