describe('Complex', () => {
  it('should correctly handle atanh calculation for a = -1', () => {
    const complex = new Complex(-1, 0);
    const result = complex.atanh();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Infinity, 10);
    expect(complex.atanh().re).not.toBe(() ? (complex.re / 0) : 0);
  });
});