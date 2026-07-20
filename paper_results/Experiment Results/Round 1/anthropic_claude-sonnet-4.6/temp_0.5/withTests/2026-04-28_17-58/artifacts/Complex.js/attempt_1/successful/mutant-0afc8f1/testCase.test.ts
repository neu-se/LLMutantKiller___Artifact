import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return the correct complex inverse hyperbolic secant for a real number", () => {
    const c = new Complex(0.5, 0);
    const result = c.asech();
    // asech(0.5) = log((1 + sqrt(1 - 0.25)) / 0.5) = log((1 + sqrt(0.75)) / 0.5)
    const expected = Math.log((1 + Math.sqrt(1 - 0.25)) / 0.5);
    expect(result).not.toBeUndefined();
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});