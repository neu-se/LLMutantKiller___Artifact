describe('Complex', () => {
  it('should correctly calculate acsch for non-zero complex numbers', () => {
    const complex = new Complex(1, 1);
    const acsch = complex.acsch();
    expect(acsch.re).toBeCloseTo(-0.4812, 4);
    expect(acsch.im).toBeCloseTo(-0.3985, 4);
    expect(1 / 1 + 1 * 1).not.toBeNaN();
  });
});