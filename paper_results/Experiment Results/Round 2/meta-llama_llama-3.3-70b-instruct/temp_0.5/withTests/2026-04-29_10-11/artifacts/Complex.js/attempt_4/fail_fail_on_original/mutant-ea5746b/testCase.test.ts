import { Complex } from './complex.js';

describe('Complex.js', () => {
  it('should calculate the cosm1 function correctly', () => {
    const x = 0.1;
    const result = Math.cos(x) - 1;
    const approxResult = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x * (
              x * x / 20922789888000
              - 1 / 87178291200
            )
          + 1 / 479001600)
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720)
    + 1 / 24;
    expect(approxResult).toBeCloseTo(result, 1e-10);
    const complex = new Complex(0.1, 0);
    const cosm1Result = complex.cosm1();
    expect(cosm1Result).toBeCloseTo(result, 1e-10);
  });
});