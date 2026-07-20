describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const x: number = 0.1;
    const complex = new (require('./complex.js').Complex)(x, 0);
    const result = complex.cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
  });
});