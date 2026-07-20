import plural from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function with f/fe ending words', () => {
  it('should handle "dwarf" and "roof" as exceptions', () => {
    expect(plural('dwarf')).toBe('dwarfs');
    expect(plural('roof')).toBe('roofs');
  });
});