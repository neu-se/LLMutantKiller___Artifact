describe('Complex.js', () => {
  it('should calculate hypot correctly for original code and fail for mutated code', () => {
    const a = 3;
    const b = 4;
    const complex = new Complex(a, b);
    const result = complex.abs();
    // In the original code, the hypot function returns a * sqrt(1 + b * b)
    // In the mutated code, the hypot function returns a / sqrt(1 + b * b)
    // So, we expect the result to be close to a * sqrt(1 + b * b) for the original code
    expect(result).toBeCloseTo(5);
  });
});