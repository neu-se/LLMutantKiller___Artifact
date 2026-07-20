const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
    expect(plural('roof', 2)).toBe('roofs');
  });
});