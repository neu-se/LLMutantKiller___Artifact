import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly handle positive real numbers and fail for non-positive", () => {
    const positive = new Complex(1, 0);
    const result = positive.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const nonPositive = new Complex(-1, 0);
    const result2 = nonPositive.log();
    expect(result2.re).toBeCloseTo(Math.log(1));
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});