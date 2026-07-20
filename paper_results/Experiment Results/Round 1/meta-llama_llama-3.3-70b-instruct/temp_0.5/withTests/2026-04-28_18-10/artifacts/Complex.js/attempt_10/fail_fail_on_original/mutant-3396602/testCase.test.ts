describe('Complex', () => {
  it('should correctly calculate cosecans and fail when mutated', () => {
    const complex = new (require('./complex.js').Complex)(1, 1);
    const result = complex.csc();
    const expectedRe = -0.27182818284590453;
    const expectedIm = 0.2718281828459045;
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(expectedIm, 10);
  });
});