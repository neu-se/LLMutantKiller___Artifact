const plural = require('../index');

describe('plural', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('knife')).toBe('knives');
    expect(plural('leaf')).toBe('leaves');
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('rooves');
  });
});