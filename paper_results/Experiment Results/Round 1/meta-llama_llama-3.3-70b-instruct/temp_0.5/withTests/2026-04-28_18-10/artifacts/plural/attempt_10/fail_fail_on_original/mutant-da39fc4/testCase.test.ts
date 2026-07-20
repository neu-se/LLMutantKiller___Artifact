const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('wolf')).toBe('wolves');
    expect(plural('roof')).not.toBe('rooves');
  });
});