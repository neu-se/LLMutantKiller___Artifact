describe('Complex', () => {
  it('should correctly calculate the hypotenuse using the hypot function', () => {
    const x = 1;
    const y = 3001;
    const result = Math.hypot(x, y);
    expect(result).toBeCloseTo(Math.sqrt(x * x + y * y));
  });
});