import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words ending with vowel + "o" and not add "es"', () => {
    expect(plural('kangaroo', 2)).toBe('kangaroos');
    expect(plural('bamboo', 2)).toBe('bamboos');
    expect(plural('folio', 2)).toBe('folios');
  });
});