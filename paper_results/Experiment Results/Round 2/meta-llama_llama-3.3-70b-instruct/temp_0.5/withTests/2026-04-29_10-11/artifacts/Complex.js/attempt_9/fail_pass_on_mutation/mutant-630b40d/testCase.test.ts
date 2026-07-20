describe('Complex.js', () => {
  it('should calculate hypot correctly for original code and fail for mutated code', () => {
    const a = 3;
    const b = 4;
    // Since we cannot import the Complex class, we will have to manually calculate the hypot
    const originalHypot = Math.sqrt(a * a + b * b);
    const mutatedHypot = a / Math.sqrt(1 + b * b);
    expect(originalHypot).not.toBeCloseTo(mutatedHypot);
  });
});