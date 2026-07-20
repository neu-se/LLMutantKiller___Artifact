describe('Complex.js', () => {
  it('should calculate hypot correctly for numbers at the threshold', () => {
    const hypot = (a: number, b: number) => {
      var _a = Math.abs(a);
      var _b = Math.abs(b);

      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }

      if (a < b) {
        a = b;
        b = a / b;
      } else {
        b = b / a;
      }
      return a * Math.sqrt(1 + b * b);
    };

    const result1 = hypot(3000, 2999.999);
    const result2 = hypot(3000, 3000);
    expect(result1).toBeCloseTo(Math.sqrt(3000 * 3000 + 2999.999 * 2999.999), 4);
    expect(result2).toBeCloseTo(Math.sqrt(3000 * 3000 + 3000 * 3000), 4);
  });
});