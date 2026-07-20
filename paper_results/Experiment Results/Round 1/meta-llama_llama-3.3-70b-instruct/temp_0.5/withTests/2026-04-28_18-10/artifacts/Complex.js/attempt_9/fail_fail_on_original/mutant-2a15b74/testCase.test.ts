describe('Complex', () => {
  it('should calculate division correctly', () => {
    const Complex = require('./complex.js').Complex;
    const c1 = new Complex(1, 2);
    const c2 = new Complex(3, 4);
    const result = c1.div(c2);
    const expectedReal = (1 * 3 + 2 * 4) / (3 * 3 + 4 * 4);
    const expectedImaginary = (2 * 3 - 1 * 4) / (3 * 3 + 4 * 4);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});