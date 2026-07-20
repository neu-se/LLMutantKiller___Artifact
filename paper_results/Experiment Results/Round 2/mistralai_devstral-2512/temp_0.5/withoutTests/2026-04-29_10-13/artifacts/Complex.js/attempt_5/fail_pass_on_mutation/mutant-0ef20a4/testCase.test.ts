import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return INFINITY when called on ZERO", () => {
    const zero = Complex.ZERO;
    const result = zero.inverse();
    expect(result.isInfinite()).toBe(true);
  });
});