import { Complex } from './complex.js';

describe('Complex', () => {
  it('should return the correct result for cosm1', () => {
    const x = 0.000001;
    const cosm1Original = x * x * (
      x * x * (
        x * x * (
          x * x * (
            x * x / 20922789888000
            - 1 / 87178291200)
          + 1 / 479001600)
        - 1 / 3628800)
      + 1 / 40320)
    - 1 / 720
    + 1 / 24
    - 1 / 2;
    const complex = new Complex(x, 0);
    const expm1 = complex.expm1();
    expect(expm1.re).toBeCloseTo(Math.expm1(x), 10);
    expect(expm1.im).toBeCloseTo(0, 10);
  });
});