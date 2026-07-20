describe('Complex', () => {
  it('should correctly compare two complex numbers', () => {
    const Complex = require('../complex.js').Complex;
    const c1 = new Complex(1, 1);
    const c2 = new Complex(1, 1.000000000000001);
    expect(c1.equals(1, 1.000000000000001)).toBe(true);
    expect(c1.equals(1, 1.000000000000002)).toBe(false);
  });
});