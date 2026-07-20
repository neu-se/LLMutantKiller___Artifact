import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex pow function", () => {
  it("should correctly compute (-2)^1.5 using the general complex formula", () => {
    // (-2)^1.5 = (-2)^(3/2)
    // Original: b===0, a=-2, a>0 is false -> general formula
    //   arg = atan2(0,-2) = π, loh = log(2)
    //   result_re = exp(1.5*log(2)) * cos(1.5π) ≈ 0
    //   result_im = exp(1.5*log(2)) * sin(1.5π) ≈ -2.828
    // Mutated: b===0, a=-2, a<=0 is true -> Math.pow(-2, 1.5) = NaN
    const result = new Complex(-2, 0).pow(new Complex(1.5, 0));
    expect(isNaN(result.re)).toBe(false);
    expect(result.re).toBeCloseTo(0, 5);
    expect(result.im).toBeCloseTo(-2 * Math.sqrt(2), 5);
  });
});