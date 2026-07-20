import { plural } from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should handle words ending with fe or f correctly', () => {
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('dwarf', 2)).toBe('dwarves');
  });
});