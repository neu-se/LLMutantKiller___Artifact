import { Complex } from "./complex.js";

describe('Complex.js', () => {
  it('should correctly calculate cos(x) - 1 using Taylor series for small x', () => {
    const smallX = 0.01;
    const result = Complex.cosm1(smallX);
    const expected = smallX * smallX * (
      smallX * smallX * (
        smallX * smallX * (
          smallX * smallX * (
            smallX * smallX * (
              smallX * smallX / 20922789888000
              - 1 / 87178291200)
            + 1 / 479001600)
          - 1 / 3628800)
        + 1 / 40320)
      - 1 / 720)
    + 1 / 24)
    - 1 / 2;
    expect(result).toBeCloseTo(expected, 10);
  });
});