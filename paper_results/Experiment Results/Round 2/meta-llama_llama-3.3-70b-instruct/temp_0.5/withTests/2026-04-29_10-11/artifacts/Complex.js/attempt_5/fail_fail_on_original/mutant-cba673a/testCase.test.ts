const complex = require('./complex.js');
const Complex = complex.Complex;

describe('Complex.js', () => {
  it('should calculate cosh correctly', () => {
    const complex = new Complex(1, 0);
    const result = complex.cosh();
    if (typeof Math.cosh === 'function') {
      expect(result.re).toBeCloseTo(Math.cosh(1));
      expect(result.im).toBeCloseTo(0);
    } else {
      expect(result.re).toBeCloseTo((Math.exp(1) + Math.exp(-1)) / 2);
      expect(result.im).toBeCloseTo(0);
    }
  });
});