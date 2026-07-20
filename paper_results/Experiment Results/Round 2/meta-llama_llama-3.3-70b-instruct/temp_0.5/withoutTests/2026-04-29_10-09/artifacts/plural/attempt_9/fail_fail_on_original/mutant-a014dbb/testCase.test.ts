const plural = require('../../../../index.js');

describe('plural function', () => {
  it('should correctly pluralize "dwarf" and "roof"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
    expect(plural('roof', 2)).toBe('roofs');
    // Test the case where the mutation occurs
    const result = plural('dwarf', 2);
    expect(result).not.toBe('dwarf');
  });
});