import { Matcher } from "../../../../../../../../../../../subject_repositories/spacl-core/src/matcher";

describe('Matcher', () => {
  it('should throw an error with a specific message when the path starts with a slash', () => {
    try {
      new Matcher('/');
    } catch (e) {
      expect(e.message).toBe('Path contains empty segments');
    }
  });
});