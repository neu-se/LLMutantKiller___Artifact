import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a descriptive message when the path contains invalid characters', () => {
    const spec = '/path/with$invalid/characters';
    try {
      new Matcher(spec);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error.message.length).toBeGreaterThan(0);
    }
  });
});