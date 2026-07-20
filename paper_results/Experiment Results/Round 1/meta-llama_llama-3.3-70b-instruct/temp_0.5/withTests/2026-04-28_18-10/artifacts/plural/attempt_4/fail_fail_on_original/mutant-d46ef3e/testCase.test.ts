import plural = require('../index.js');

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('fox')).toBe('foxes');
    expect(plural('church')).toBe('churches');
    expect(plural('bus')).toBe('buses');
    expect(plural('max')).toBe('maxes');
    expect(plural('x')).toBe('xes'); // This will fail in the mutated code
  });
});