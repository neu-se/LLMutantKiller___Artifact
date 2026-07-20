const plural = require('./index.js');

describe('plural library', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});