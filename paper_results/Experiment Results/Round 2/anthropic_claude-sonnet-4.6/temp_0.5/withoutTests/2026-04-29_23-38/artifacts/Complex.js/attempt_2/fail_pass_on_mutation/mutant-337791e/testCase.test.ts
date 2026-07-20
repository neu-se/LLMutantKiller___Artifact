import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex exp method", () => {
  it("should return correct imaginary part for exp of purely real number", () => {
    // exp(2 + 0i) should equal e^2 with imaginary part 0
    // sin(0) = 0, so im should be exactly 0
    const c = new Complex(2, 0);
    const result = c.exp();
    
    expect(result.re).toBeCloseTo(Math.exp(2), 10);
    expect(result.im).toBe(0);
  });
});