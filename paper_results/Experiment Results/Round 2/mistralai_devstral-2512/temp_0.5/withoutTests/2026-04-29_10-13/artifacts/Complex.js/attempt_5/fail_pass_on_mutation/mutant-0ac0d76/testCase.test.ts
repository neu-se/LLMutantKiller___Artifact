import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly compute log for positive real numbers and fail for non-positive", () => {
    const positive = new Complex(2, 0);
    const result = positive.log();
    expect(result.re).toBeCloseTo(Math.log(2));
    expect(result.im).toBe(0);

    const nonPositive = new Complex(-2, 0);
    const result2 = nonPositive.log();
    expect(result2.re).toBeCloseTo(Math.log(2));
    expect(result2.im).toBeCloseTo(Math.PI);
  });
});