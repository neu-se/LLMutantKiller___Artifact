import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize the word "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarves');
  });
});