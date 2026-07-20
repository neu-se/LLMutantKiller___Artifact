import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex inverse method", () => {
  it("should return a complex number with infinite real part when inverting zero", () => {
    const zero = new Complex(0, 0);
    const result = zero.inverse();
    expect(result.re).toBe(Infinity);
  });
});