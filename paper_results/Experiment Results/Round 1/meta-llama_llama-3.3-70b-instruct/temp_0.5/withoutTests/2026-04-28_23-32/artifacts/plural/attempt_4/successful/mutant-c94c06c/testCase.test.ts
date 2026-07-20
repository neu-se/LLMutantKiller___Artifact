import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with "fe" or "f"', () => {
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
});