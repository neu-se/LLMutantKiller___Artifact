import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "roof"', () => {
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
});