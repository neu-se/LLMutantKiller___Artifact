import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex atan", () => {
  it("atan(0 - i) toString should not include negative sign on real part", () => {
    const result = new Complex(0, -1).atan();
    const str = result.toString();
    // Original: Complex(0, -Infinity) -> "-Infinityi"
    // Mutated: Complex(-0, -Infinity) -> toString treats -0 differently?
    // Both im=-Infinity, re=0 or -0
    // When re=0 (falsy after epsilon check), toString shows just imaginary
    // When re=-0, Math.abs(-0) = 0 < EPSILON, so a=0, same result
    // Let's check the actual string
    expect(str).toBe('-Infinityi');
  });
});