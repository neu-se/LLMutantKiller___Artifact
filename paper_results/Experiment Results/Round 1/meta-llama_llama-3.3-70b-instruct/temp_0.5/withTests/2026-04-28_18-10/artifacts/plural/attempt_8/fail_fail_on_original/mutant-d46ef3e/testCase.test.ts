import plural = require('../../../../../index.js');

describe('plural function', () => {
  it('should correctly pluralize words that end with x, ch, or s', () => {
    expect(plural('max')).toBe('maxes');
    expect(plural('box')).toBe('boxes');
    expect(plural('church')).toBe('churches');
    expect(plural('bus')).toBe('buses');
    expect(plural('x')).toBe('xes'); 
    expect(plural('maxx')).toBe('maxxes'); // This will pass in the original code and fail in the mutated code
  });
});