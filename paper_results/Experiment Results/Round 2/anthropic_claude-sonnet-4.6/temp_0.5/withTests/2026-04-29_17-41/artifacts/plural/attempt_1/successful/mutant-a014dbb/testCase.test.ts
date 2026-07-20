import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural - dwarf and roof exceptions', () => {
  it('should return "dwarfs" and "roofs" as the plural of "dwarf" and "roof"', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});