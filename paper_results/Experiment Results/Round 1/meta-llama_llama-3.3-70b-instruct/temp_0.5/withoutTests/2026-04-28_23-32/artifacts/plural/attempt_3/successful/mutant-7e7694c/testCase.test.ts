import plural from '../../../../../../../../../../../subject_repositories/plural/index.js';

describe('plural function', () => {
  it('should correctly pluralize the word "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
    expect(plural('roof', 2)).toBe('roofs');
    expect(plural('dwarf', 1)).toBe('dwarf');
    expect(plural('roof', 1)).toBe('roof');
  });
});