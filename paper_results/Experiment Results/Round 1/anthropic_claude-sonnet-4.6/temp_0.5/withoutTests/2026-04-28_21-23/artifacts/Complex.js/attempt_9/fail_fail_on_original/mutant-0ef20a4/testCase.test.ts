import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("inverse of zero should equal Complex.INFINITY", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.equals(Complex.INFINITY)).toBe(true);
  });
});