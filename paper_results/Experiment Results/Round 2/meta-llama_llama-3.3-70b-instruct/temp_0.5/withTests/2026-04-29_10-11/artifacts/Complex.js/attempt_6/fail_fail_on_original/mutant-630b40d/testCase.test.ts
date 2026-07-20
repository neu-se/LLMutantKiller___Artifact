describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const complex = new Complex(3, 4);
    const result = complex.abs();
    expect(result).toBeCloseTo(5);
  });
});