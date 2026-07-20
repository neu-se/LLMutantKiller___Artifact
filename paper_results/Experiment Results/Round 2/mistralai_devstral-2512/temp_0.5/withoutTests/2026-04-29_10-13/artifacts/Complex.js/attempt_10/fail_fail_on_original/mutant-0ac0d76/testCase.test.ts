import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.log", () => {
  it("should correctly compute log for positive real numbers and fail for zero", () => {
    const positive = new Complex(1, 0);
    const result = positive.log();
    expect(result.re).toBeCloseTo(0);
    expect(result.im).toBeCloseTo(0);

    const zero = new Complex(0, 0);
    const result2 = zero.log();
    expect(result2.re).toBe(-Infinity);
    expect(result2.im).toBeNaN();
  });
});