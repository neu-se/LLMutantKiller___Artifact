const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize words ending with y', () => {
    expect(plural('city')).toBe('cities');
    expect(plural('fly')).toBe('flies');
    expect(plural('boy')).toBe('boys');
    expect(plural('alloy')).toBe('alloys');
    expect(plural('ay')).toBe('ies'); 
  });
});