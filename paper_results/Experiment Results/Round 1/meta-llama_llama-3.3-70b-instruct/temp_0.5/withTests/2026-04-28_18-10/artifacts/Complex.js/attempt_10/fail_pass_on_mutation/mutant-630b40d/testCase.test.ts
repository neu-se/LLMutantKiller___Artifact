describe('Complex', () => {
  it('should calculate hypot correctly', () => {
    const a = 3;
    const b = 4;
    const hypot = a * Math.sqrt(1 + (b * b) / (a * a));
    expect(hypot).toBeCloseTo(5, 10);
  });
});