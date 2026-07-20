import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with f/fe ending words', () => {
  it('should correctly pluralize "dwarf" to "dwarfs"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
  });
});