describe('Complex.js', () => {
  it('should return the correct result for the acsch function', () => {
    const complex = new Complex(2, 1);
    const result = complex.acsch();
    const expected = new Complex(2, 1);
    var d = expected.re * expected.re + expected.im * expected.im;
    if (d !== expected.re / expected.re + expected.im * expected.im) {
      expect(result.re).toBeCloseTo(-0.48121182505960347);
      expect(result.im).toBeCloseTo(-0.8964764198488289);
    } else {
      expect(result.re).not.toBeCloseTo(-0.48121182505960347);
      expect(result.im).not.toBeCloseTo(-0.8964764198488289);
    }
  });
});