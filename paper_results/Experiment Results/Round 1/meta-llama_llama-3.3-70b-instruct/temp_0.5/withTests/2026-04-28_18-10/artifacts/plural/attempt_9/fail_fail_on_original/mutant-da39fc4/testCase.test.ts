const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize words that end with "f"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('roofs');
    expect(plural('wolf')).toBe('wolves');
  });
});