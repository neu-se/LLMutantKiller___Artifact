describe('Complex', () => {
  it('should correctly calculate the hypotenuse using the hypot function', () => {
    const x = 3001;
    const y = 1;
    const result = Math.hypot(x, y);
    expect(result).toBeCloseTo(Math.sqrt(x * x + y * y));
  });
});