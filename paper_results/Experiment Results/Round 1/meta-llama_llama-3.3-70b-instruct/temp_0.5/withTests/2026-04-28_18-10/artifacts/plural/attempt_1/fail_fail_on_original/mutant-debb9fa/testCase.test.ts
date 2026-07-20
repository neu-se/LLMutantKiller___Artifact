import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});