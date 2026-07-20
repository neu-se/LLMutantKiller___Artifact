import plural = require('./index');

describe('plural', () => {
  it('should correctly pluralize "dwarf" and "roof"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('rooves');
  });
});