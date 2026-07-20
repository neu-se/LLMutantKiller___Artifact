import plural = require('./index.js');

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('box')).toBe('boxes');
    expect(plural('church')).toBe('churches');
    expect(plural('bus')).toBe('buses');
    expect(plural('fox')).toBe('foxes');
    expect(plural('tax')).toBe('taxes');
    expect(plural('x')).toBe('xes'); // This will pass in the original code and fail in the mutated code
  });
});