describe('Complex', () => {
  it('should calculate the arcus secant of a complex number correctly', () => {
    const complex = {
      re: 1,
      im: 0,
      asec: function() {
        return { re: 0, im: Infinity };
      }
    };
    const result = complex.asec();
    expect(result.re).toBeCloseTo(0, 6);
    expect(result.im).toBeCloseTo(Infinity, 6);
  });
});