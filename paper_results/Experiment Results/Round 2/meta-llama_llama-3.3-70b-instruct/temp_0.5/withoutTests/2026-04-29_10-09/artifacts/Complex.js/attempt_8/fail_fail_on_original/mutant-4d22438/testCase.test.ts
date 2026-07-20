describe('Complex', () => {
  it('should correctly calculate the hypotenuse using the hypot function', () => {
    const x = 1;
    const y = 3001;
    const result = (function(x, y) {
      var a = Math.abs(x);
      var b = Math.abs(y);
      if (a < 3000 && b < 3000) {
        return Math.sqrt(a * a + b * b);
      }
      if (a < b) {
        a = b;
        b = y / x; // original line
      } else {
        b = x / y;
      }
      return a * Math.sqrt(1 + b * b);
    })(x, y);
    expect(result).toBeCloseTo(Math.sqrt(x * x + y * y));
  });
});