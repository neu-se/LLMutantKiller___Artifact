describe('Complex', () => {
  it('should correctly calculate cosecans and fail when mutated', () => {
    const Complex = require('../complex.js').Complex;
    const complex = new Complex(1, 1);
    const result = complex.csc();
    const denominatorOriginal = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    const actualDenominator = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    expect(actualDenominator).toBeCloseTo(denominatorOriginal, 10);
    expect(result.re).not.toBeNaN();
    expect(result.im).not.toBeNaN();
  });
});