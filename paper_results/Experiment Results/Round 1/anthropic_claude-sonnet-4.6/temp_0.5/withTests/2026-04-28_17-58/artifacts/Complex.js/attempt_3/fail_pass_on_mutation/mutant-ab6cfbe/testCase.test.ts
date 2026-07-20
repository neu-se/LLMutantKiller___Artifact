import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex log mutation", () => {
  it("log of complex number with zero imaginary and zero real part should give correct result", () => {
    // asin uses log internally; asin(0) = 0
    const result = new Complex(0, 0).asin();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});