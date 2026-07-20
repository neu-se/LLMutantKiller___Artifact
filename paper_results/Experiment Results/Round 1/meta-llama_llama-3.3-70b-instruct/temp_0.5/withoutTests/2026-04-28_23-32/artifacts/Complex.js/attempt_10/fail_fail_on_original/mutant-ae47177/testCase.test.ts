describe('Complex', () => {
  it('should calculate atan correctly for a = 0 and b = 1', () => {
    const complex = new (require('./complex').Complex)(0, 1);
    const result = complex.atan();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(Infinity);
  });
});