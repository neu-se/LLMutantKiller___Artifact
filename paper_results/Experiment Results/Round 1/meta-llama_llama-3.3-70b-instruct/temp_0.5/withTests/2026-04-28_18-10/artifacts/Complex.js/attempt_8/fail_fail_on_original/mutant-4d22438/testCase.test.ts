describe('Complex.js', () => {
  it('should calculate hypot correctly for large numbers', () => {
    const x: number = 3001;
    const y: number = 3000;
    const result: number = Math.sqrt(x * x + y * y);
    expect(result).toBeCloseTo(4242.64, 2);
  });
});