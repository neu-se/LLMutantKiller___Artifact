import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Infinity for asec(0, 0) but not for asec(0, 1)", () => {
    const zeroResult = new Complex(0, 0).asec();
    const nonZeroImaginary = new Complex(0, 1).asec();
    expect(zeroResult.isInfinite()).toBe(true);
    expect(nonZeroImaginary.isInfinite()).toBe(false);
  });
});