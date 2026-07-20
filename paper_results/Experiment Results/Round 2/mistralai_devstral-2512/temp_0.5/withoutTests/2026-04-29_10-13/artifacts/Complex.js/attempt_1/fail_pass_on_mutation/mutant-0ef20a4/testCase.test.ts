import { Complex } from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse", () => {
  it("should return Infinity when called on zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.isInfinite()).toBe(true);
  });
});