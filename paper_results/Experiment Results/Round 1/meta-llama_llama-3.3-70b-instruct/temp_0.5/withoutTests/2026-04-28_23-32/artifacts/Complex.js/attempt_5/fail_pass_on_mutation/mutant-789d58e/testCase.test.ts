describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const x: number = 0.1;
    const cosm1 = function(x: number) {
      var b = Math.PI / 4;
      if (-b > x || x > b) {
        return Math.cos(x) - 1.0;
      }

      var xx = x * x;
      return xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx / 20922789888000
                  - 1 / 87178291200)
                + 1 / 479001600)
              + 1 / 362880)
            - 1 / 720)
          + 1 / 24)
        - 1 / 2);
    };
    const result = cosm1(x);
    const expected = Math.cos(x) - 1;
    expect(result).toBeCloseTo(expected, 10);
    // Test the incorrect implementation
    const incorrectCosm1 = function(x: number) {
      var b = Math.PI / 4;
      if (-b > x || x > b) {
        return Math.cos(x) - 1.0;
      }

      var xx = x * x;
      return xx * (
        xx * (
          xx * (
            xx * (
              xx * (
                xx * (
                  xx / 20922789888000
                  + 1 * 362880)
                + 1 / 479001600)
              + 1 / 362880)
            - 1 / 720)
          + 1 / 24)
        - 1 / 2);
    };
    expect(incorrectCosm1(x)).not.toBeCloseTo(expected, 10);
  });
});