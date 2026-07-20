import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should not apply "es" ending to words ending with vowel + "o" when followed by other characters', () => {
    expect(plural('folio')).toBe('folios');
  });
});