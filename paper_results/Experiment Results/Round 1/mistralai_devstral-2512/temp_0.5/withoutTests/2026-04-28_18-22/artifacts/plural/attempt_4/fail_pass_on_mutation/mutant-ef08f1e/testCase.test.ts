import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not add "es" to words ending with vowel + "o" followed by other characters', () => {
    expect(plural('patio')).toBe('patios');
  });
});