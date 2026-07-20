import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should return the correct plural form for "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
});