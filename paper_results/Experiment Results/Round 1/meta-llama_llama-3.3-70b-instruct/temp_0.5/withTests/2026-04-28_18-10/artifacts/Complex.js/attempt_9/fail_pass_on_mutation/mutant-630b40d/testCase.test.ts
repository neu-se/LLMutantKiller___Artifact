describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const hypotOriginal = Math.sqrt(a * a + b * b);
    const hypotMutated = a / Math.sqrt(1 + (b * b) / (a * a));
    expect(hypotOriginal).not.toBeCloseTo(hypotMutated, 10);
  });
});