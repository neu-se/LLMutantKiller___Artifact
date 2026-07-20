import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly pluralize "dwarf" to "dwarfs"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
  });
});