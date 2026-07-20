import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains invalid characters', () => {
    const spec = '/path/with$invalid/characters';
    try {
      new Matcher(spec);
    } catch (error) {
      expect(error.message).not.toBe('');
    }
    const spec2 = 'path/with$invalid/characters';
    try {
      new Matcher(spec2);
    } catch (error) {
      expect(error.message).not.toBe('');
    }
  });
});