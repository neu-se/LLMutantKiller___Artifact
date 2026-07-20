const cosm1Original = (x) => {
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
              - 1 / 87178291200
            )
          + 1 / 479001600)
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720)
  + 1 / 24;
};

const cosm1Mutated = (x) => {
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
              xx / 20922789888000 - 1 / 87178291200
            ) - 1 / 479001600
          )
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720)
  + 1 / 24;
};

describe('cosm1 function', () => {
  it('should calculate the cosm1 function correctly', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const cosm1ResultOriginal = cosm1Original(x);
    expect(cosm1ResultOriginal).toBeCloseTo(result, 1e-10);
    const cosm1ResultMutated = cosm1Mutated(x);
    expect(cosm1ResultMutated).not.toBeCloseTo(result, 1e-10);
  });
});