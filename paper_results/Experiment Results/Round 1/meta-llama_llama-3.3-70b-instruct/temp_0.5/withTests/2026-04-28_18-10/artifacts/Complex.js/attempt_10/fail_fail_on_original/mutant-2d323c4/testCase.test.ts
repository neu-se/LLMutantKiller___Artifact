describe('Complex', () => {
  it('should return correct result for acsch method', () => {
    const complex = new Complex(1, 1);
    const result = complex.acsch();
    expect(result.re).toBeCloseTo(0.48121182505960347);
    expect(result.im).toBeCloseTo(0);
    const complex2 = new Complex(0, 0);
    expect(complex2.acsch().re).not.toBeNaN();
  });
});