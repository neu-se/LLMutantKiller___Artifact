const plural = require('../../index.js');

describe('plural function', () => {
  it('should return the correct plural form for the word "dwarf"', () => {
    expect(plural('dwarf', 2)).toBe('dwarfs');
  });
  it('should return the correct plural form for the word ""', () => {
    expect(plural('', 2)).not.toBe('ves');
  });
});