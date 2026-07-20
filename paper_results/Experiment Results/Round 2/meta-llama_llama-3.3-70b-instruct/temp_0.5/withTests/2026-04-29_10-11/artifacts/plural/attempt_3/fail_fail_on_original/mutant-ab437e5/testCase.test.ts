import plural = require('./index');

describe('plural function', () => {
  it('should correctly pluralize words ending with y', () => {
    expect(plural('fly')).toBe('flies');
    expect(plural('city')).toBe('cities');
    expect(plural('boy')).toBe('boys');
    expect(plural('alloy')).toBe('alloys');
    expect(plural('fly')).not.toBe('flys'); // This test case should pass in the original code and fail in the mutated code
  });
});