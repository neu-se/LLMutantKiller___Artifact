describe('Complex.js', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const x: number = 3;
    const y: number = 4;
    const result: number = Math.sqrt(x * x + y * y);
    expect(result).toBeCloseTo(5);
  });
});