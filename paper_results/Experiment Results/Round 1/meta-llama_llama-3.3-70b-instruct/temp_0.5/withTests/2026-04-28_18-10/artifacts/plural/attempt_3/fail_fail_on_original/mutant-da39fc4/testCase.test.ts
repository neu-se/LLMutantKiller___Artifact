import plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf')).toBe('dwarves');
  });
});