import plural = require('./index.js');

describe('plural', () => {
  it('should handle -ics ending words correctly', () => {
    expect(plural('mathematics')).toBe('mathematics');
    expect(plural('MathEmAtIcS')).toBe('MathEmAtIcS');
  });
});