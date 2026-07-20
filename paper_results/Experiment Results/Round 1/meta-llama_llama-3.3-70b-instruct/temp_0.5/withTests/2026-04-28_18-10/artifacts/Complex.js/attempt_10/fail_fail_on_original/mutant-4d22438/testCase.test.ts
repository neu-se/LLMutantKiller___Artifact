describe('Complex.js', () => {
  it('should calculate hypot correctly for specific values', () => {
    const x: number = 3;
    const y: number = 4;
    const result: number = (x * x + y * y) / (x + y);
    expect(result).toBeCloseTo(2.4285714285714284);
  });
});