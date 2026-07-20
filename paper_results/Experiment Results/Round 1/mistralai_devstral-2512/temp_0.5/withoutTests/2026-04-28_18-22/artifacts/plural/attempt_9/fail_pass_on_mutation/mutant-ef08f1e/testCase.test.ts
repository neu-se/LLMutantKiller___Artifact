import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not add "es" to words ending with vowel + "o" when the "o" is not at the end', () => {
    expect(plural('aio')).toBe('aios');
  });
});