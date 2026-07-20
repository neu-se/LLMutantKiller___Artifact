import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex.asec", () => {
  it("should return Infinity for asec(0, 0) and not for other values", () => {
    const zeroResult = new Complex(0, 0).asec();
    const nonZeroResult = new Complex(1, 1).asec();
    expect(zeroResult.isInfinite()).toBe(true);
    expect(nonZeroResult.isInfinite()).toBe(false);
  });
});