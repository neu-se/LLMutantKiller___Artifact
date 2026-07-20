import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method infinity behavior", () => {
  it("should return NaN when this is infinite and argument is finite", () => {
    const inf = Complex.INFINITY;
    const finite = new Complex(2, 3);
    
    // Original (||): inf.sub(finite) hits first check, returns NaN
    // Mutated (&&): inf.sub(finite) - only this is infinite, not both,
    //               skips first check, hits second check (||), returns INFINITY
    const result = inf.sub(finite);
    
    expect(result.isNaN()).toBe(true);
  });
});