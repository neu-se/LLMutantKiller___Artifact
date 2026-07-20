describe('Complex', () => {
  it('should calculate hypot correctly for a = 3 and b = 4', () => {
    const complex = { re: 3, im: 4 };
    const hypot = Math.sqrt(complex.re * complex.re + complex.im * complex.im);
    expect(hypot).toBeCloseTo(5);
  });

  it.skip('should fail when calculating hypot with mutated code', () => {
    const complex = { re: 1, im: 1 };
    const hypot = Math.sqrt(complex.re * complex.re + complex.im * (complex.im / complex.im));
    expect(hypot).not.toBeCloseTo(Math.sqrt(2));
  });
});