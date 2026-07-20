const index = require('./index');

describe('plural function', () => {
  it('should return the correct plural form for bacterium', () => {
    expect(index('bacterium', 2)).not.toBe('');
    expect(index('bacterium', 2)).not.toBe('bacterium');
    expect(index('bacterium', 2)).not.toBeUndefined();
    expect(index('bacterium', 2)).not.toBeNull();
  });
});