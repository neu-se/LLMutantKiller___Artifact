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

    const result1 = hypot(3000, 3000);
    const result2 = hypot(3000, 3000.0001);
    expect(result1).not.toBeCloseTo(result2, 4);
  });
});