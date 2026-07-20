import { Complex } from "./complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cosm1 for small values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    const expectedRe = Math.expm1(0.1) * Math.cos(0) + cosm1(0);
    expect(result.re).toBeCloseTo(expectedRe, 10);
  });
});

function cosm1(x: number): number {
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
              xx * (
                xx / 20922789888000
                   - 1 / 87178291200)
              - 1 / 3628800)
            + 1 / 40320)
          - 1 / 720)
        + 1 / 24)
      - 1 / 2);
}