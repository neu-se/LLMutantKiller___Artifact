describe('Complex', () => {
  it('should calculate the complex cosecans correctly', () => {
    const complex = new (require('../../complex.js').Complex)(1, 1);
    const result = complex.csc();
    const d = 0.5 * Math.cosh(2 * 1) - 0.5 * Math.cos(2 * 1);
    const originalResult = new complex.constructor(
      Math.sin(1) * Math.cosh(1) / d,
      -Math.cos(1) * Math.sinh(1) / d
    );
    expect(result.re).toBeCloseTo(originalResult.re, 10);
    expect(result.im).toBeCloseTo(originalResult.im, 10);
  });
});