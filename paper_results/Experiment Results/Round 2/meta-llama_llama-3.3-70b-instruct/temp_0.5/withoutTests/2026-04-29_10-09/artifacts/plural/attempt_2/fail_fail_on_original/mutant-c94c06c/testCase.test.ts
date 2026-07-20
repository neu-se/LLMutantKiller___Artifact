import * as pluralModule from "../../../../../../../../../../../subject_repositories/plural/index.js";

describe('plural function', () => {
  it('should correctly handle the plural form of "roof" and "dwarf"', () => {
    expect(pluralModule.plural('roof')).toBe('roofs');
    expect(pluralModule.plural('dwarf')).toBe('dwarves');
  });
});