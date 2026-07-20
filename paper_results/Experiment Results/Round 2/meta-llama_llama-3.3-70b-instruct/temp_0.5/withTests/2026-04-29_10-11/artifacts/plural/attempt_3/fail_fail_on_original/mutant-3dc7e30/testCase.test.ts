import plural = require('./index.js');

describe('plural function', () => {
  it('should correctly pluralize "bacterium"', () => {
    expect(plural('bacterium')).toBe('bacteria');
  });
});