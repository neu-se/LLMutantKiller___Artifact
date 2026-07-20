import * as pluralModule from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize words that end with "fe" or "f"', () => {
    expect(pluralModule.plural('roof', 2)).toBe('roofs');
    expect(pluralModule.plural('dwarf', 2)).toBe('dwarves');
  });
});