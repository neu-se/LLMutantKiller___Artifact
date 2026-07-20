const plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize words ending with y', () => {
    expect(plural('fly')).toBe('flies');
    expect(plural('city')).toBe('cities');
    expect(plural('boy')).toBe('boys');
    expect(plural('alloy')).toBe('alloys');
    expect(plural('ay')).not.toBe('ays'); 
  });
});