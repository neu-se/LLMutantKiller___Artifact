import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp function", () => {
  it("should correctly compute exp of a purely real complex number", () => {
    // exp(1 + 0i) = e + 0i
    const result = new Complex(1, 0).exp();
    expect(result.re).toBeCloseTo(Math.E, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});