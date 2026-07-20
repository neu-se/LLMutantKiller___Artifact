describe('Complex.js', () => {
  it('should correctly calculate the ceiling of a complex number', () => {
    const complex = new Complex(1.2, 3.4);
    const result = complex.ceil(1);
    expect(result.re).toBeCloseTo(2, 0);
    expect(result.im).toBeCloseTo(4, 0);
    const result2 = complex.ceil(1);
    expect(result2.re).toBeCloseTo(2, 0);
    expect(result2.im).toBeCloseTo(4, 0);
    expect(complex.ceil(false).re).toBeNaN();
    expect(complex.ceil(false).im).toBeNaN();
  });
});