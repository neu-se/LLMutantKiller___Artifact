describe('Complex', () => {
  it('should handle hypot correctly', () => {
    const a = 3000;
    const b = 3000;
    const originalResult = Math.hypot(a, b);
    const mutatedResult = Math.hypot(a, b + 1);
    expect(originalResult).not.toBeCloseTo(mutatedResult, 10);
  });
});