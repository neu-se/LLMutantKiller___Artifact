describe('Complex', () => {
  it('should calculate division correctly for specific case', () => {
    const c1 = new Complex(4, 3);
    const c2 = new Complex(1, 2);
    const result = c1.div(c2);
    const expectedReal = (4 * 1 + 3 * 2) / (1 * 1 + 2 * 2);
    const expectedImaginary = (3 * 1 - 4 * 2) / (1 * 1 + 2 * 2);
    expect(result.re).toBeCloseTo(expectedReal);
    expect(result.im).toBeCloseTo(expectedImaginary);
  });
});