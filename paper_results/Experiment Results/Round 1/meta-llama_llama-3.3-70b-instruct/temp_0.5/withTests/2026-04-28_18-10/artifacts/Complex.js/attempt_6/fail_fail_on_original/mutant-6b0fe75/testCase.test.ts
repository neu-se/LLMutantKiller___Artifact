const Complex = require('./complex.js').Complex;

describe('Complex', () => {
  it('should correctly handle the difference between || and && operators', () => {
    const complex = new Complex(1, 0);
    const coshValue = complex.cosh();
    expect(coshValue.re).toBeCloseTo(Math.cosh(1));
    expect(coshValue.im).toBeCloseTo(0);
  });
});