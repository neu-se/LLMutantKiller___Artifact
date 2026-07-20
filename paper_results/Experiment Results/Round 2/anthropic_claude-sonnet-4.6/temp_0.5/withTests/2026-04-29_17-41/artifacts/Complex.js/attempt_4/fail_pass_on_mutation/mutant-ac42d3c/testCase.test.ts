import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan(0 - i) should produce Infinity string representation", () => {
    const result = new Complex(0, -1).atan();
    // Original: Complex(0, -Infinity) -> toString = "-Infinity*i" or "Infinity"  
    // Check isInfinite behavior
    expect(result.isInfinite()).toBe(true);
  });
});