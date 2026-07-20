describe('Complex.js', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const a = 3001;
    const b = 1;
    const result1 = Complex.hypot(a, b);
    const result2 = Math.sqrt(a * a + b * b);
    expect(result1).toBeCloseTo(result2);
    const result3 = Complex.hypot(b, a);
    expect(result3).toBeCloseTo(result2);
  });
});