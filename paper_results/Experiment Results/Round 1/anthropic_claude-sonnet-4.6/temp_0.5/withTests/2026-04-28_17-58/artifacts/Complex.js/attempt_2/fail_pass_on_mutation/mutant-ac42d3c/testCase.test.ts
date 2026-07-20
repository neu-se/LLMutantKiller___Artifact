import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan with imaginary -1", () => {
  it("should return a complex number with im === -Infinity and re === 0 when called on 0 - i", () => {
    const c = new Complex(0, -1);
    const result = c.atan();
    // Original returns new Complex(0, -Infinity) directly
    // Mutated falls through and may produce NaN or different values
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
    expect(result.re).toBe(0);
    expect(result.im).toBe(-Infinity);
  });
});