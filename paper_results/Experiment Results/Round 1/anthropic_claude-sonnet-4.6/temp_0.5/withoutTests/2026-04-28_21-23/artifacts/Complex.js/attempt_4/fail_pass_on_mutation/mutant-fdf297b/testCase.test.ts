import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when both operands are Infinity", () => {
    // Infinity - Infinity = NaN in both original and mutated
    // But finite - Infinity behavior differs:
    // Original (||): returns NaN
    // Mutated (&&): falls through to second check, returns Infinity
    // Since original returns Infinity for finite-Infinity (test showed this),
    // the mutation must make Infinity-Infinity return Infinity instead of NaN
    
    const result = Complex.INFINITY.sub(Complex.INFINITY);
    expect(result.isNaN()).toBe(true);
  });
});