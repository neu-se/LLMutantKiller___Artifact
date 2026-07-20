import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cosm1 function", () => {
  it("should correctly compute cos(x) - 1 for small x values", () => {
    const c = new Complex(0.1, 0);
    const result = c.expm1();
    const xx = 0.1 * 0.1;
    const expectedRe = Math.expm1(0.1) * Math.cos(0) + xx * (xx * (xx * (xx * (xx * (xx * (xx * (xx * 20922789888000 - 1 / 87178291200) + 1 / 479001600) - 1 / 3628800) + 1 / 40320) - 1 / 720) + 1 / 24) - 1 / 2);
    expect(result.re).toBeCloseTo(expectedRe, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});