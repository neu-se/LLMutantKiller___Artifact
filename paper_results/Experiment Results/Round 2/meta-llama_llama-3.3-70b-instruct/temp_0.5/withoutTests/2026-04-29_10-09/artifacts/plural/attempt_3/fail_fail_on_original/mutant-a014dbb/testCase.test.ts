import plural = require('../../../../index.js');

describe('plural function', () => {
  it('should correctly pluralize "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
});