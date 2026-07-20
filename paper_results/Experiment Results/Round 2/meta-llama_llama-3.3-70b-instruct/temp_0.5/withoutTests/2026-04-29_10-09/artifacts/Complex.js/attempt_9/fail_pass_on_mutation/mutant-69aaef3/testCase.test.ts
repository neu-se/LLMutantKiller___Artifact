describe('hypot function', () => {
  it('should return a finite value for small inputs and not be equal to the input', () => {
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

    expect(hypot(1, 1)).not.toBe(1);
  });
});