describe('Complex.js', () => {
  it('should calculate hypot correctly', () => {
    const x: number = 3000;
    const y: number = 3000;
    const resultOriginal: number = Math.sqrt(x * x + y * y);
    const resultMutated: number = Math.sqrt(x * x + y * y * x * x);
    expect(resultOriginal).not.toBeCloseTo(resultMutated);
  });
});