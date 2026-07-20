describe('hypot function', () => {
  it('should correctly calculate hypot for small values', () => {
    function hypot(a, b) {
      var a = Math.abs(a);
      var b = Math.abs(b);

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
    }

    expect(hypot(3, 4)).toBeCloseTo(5);
    expect(hypot(3, 0)).toBeCloseTo(3);
    expect(hypot(0, 4)).toBeCloseTo(4);
    expect(hypot(0, 0)).toBeCloseTo(0);
  });

  it('should return a finite value for small inputs', () => {
    function hypot(a, b) {
      var a = Math.abs(a);
      var b = Math.abs(b);

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
    }

    expect(Number.isFinite(hypot(1, 1))).toBe(true);
  });
});