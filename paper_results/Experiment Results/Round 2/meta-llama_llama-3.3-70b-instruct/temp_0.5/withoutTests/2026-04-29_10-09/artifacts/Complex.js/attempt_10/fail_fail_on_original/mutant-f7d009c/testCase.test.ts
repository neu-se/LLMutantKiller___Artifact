describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const complex = { re: 3000, im: 3000 };
    const result = Math.sqrt(complex.re * complex.re + complex.im * complex.im);
    expect(result).toBeCloseTo(Math.sqrt(9000000), 1e-15);
  });
});