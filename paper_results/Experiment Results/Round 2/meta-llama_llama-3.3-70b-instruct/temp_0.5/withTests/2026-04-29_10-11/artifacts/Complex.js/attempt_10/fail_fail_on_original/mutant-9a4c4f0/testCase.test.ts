describe('cosm1 function', () => {
  it('should return the correct value for small x', () => {
    const x = 0.01;
    const result = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x / 20922789888000
            - 1 / 87178291200)
          + 1 / 479001600)
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720;
    expect(result).toBeCloseTo(Math.cos(x) - 1, 10);
  });
});