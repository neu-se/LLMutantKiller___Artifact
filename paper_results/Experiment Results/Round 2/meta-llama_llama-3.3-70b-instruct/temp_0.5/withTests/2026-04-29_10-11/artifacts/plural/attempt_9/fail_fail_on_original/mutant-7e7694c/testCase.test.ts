const path = require('path');
const plural = require(path.join(__dirname, '../index.js'));

describe('plural', () => {
  it('should correctly pluralize words that end with "f" or "fe"', () => {
    expect(plural('dwarf')).toBe('dwarves');
    expect(plural('roof')).toBe('rooves');
  });
});