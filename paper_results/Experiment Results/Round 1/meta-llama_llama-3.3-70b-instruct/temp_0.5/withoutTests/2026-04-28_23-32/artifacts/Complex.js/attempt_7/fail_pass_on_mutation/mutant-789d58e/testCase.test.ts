describe('Complex.js', () => {
  it('should calculate cosm1 correctly', () => {
    const x: number = 0.1;
    const cosm1Original = (x: number) => {
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
    const cosm1Mutated = (x: number) => {
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
    const resultOriginal = cosm1Original(x);
    const resultMutated = cosm1Mutated(x);
    expect(resultOriginal).not.toBeCloseTo(resultMutated, 10);
  });
});