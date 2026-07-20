describe('Complex', () => {
  it('should return the correct acot value for a complex number', () => {
    const complex = new Complex(0, 1);
    const acot = complex.acot();
    expect(acot.re).toBeCloseTo(-Math.PI / 2, 10);
    expect(acot.im).toBeCloseTo(0, 10);
  });
});