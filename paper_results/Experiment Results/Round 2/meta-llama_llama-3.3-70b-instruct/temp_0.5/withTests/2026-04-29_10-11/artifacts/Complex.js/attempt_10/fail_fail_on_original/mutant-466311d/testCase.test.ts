describe('Complex.js', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const a = 3000;
    const b = 3000;
    const result1 = Complex.hypot(a, b);
    const result2 = Math.sqrt(a * a + b * b);
    expect(result1).toBeCloseTo(result2);
  });
});