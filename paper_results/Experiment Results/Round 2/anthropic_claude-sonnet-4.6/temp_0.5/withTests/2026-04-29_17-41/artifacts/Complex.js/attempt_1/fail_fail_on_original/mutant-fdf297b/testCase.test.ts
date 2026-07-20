import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when only one operand is infinite (not both)", () => {
    // In the original code, the condition is:
    // if (this['isInfinite']() || z['isInfinite']()) { return Complex['NAN']; }
    // In the mutated code, the condition is:
    // if (this['isInfinite']() && z['isInfinite']()) { return Complex['NAN']; }
    //
    // So when only one operand is infinite, the original returns NaN
    // but the mutated code falls through to the second check and returns Infinity.
    
    const inf = Complex.INFINITY;
    const finite = new Complex(1, 2);
    
    // Infinity - finite should return NaN in original (|| condition)
    // but in mutated code (&&), it won't match the first check,
    // and will match the second check returning INFINITY instead
    const result = inf.sub(finite);
    
    expect(result.isNaN()).toBe(true);
  });
});