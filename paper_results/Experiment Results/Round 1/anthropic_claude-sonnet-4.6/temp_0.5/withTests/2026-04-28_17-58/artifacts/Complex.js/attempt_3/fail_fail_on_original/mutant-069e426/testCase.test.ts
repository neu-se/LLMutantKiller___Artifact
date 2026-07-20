import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should handle very small real inputs where a*a underflows to zero", () => {
    // With a = 1e-200, a*a underflows to 0 in IEEE 754 double precision
    // So d = a*a + b*b = 0, reaching the d===0 branch
    // a !== 0 is true, so original returns Complex(Infinity, 0).acos()
    // Mutated: a === 0 is false, returns Complex(0, 0).acos() = Complex(PI/2, 0)
    const result = new Complex(1e-200, 0).asec();
    // Original produces Complex(0, Infinity) via Complex(Infinity, 0).acos()
    // Mutated produces Complex(PI/2, 0) via Complex(0, 0).acos()
    expect(result.im).toBe(Infinity);
  });
});