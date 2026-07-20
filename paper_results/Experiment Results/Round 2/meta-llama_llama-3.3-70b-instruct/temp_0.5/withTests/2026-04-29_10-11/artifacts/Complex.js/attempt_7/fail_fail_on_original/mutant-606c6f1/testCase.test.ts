describe('Complex', () => {
  it('should handle addition with infinite values correctly', () => {
    const Complex = require('./complex').Complex;
    const c1 = new Complex(1, 0);
    const c2 = new Complex(Infinity, 0);
    const result = c1.add(c2);
    expect(result.toString()).not.toBe('1 0');
  });
});