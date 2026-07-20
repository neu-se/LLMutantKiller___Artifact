describe('Complex', () => {
  it('should handle hypot correctly', () => {
    const a = 3000;
    const b = 3000.000001;
    const result = Math.hypot(a, b);
    expect(result).toBeCloseTo(Math.sqrt(a * a + b * b), 10);
  });
});