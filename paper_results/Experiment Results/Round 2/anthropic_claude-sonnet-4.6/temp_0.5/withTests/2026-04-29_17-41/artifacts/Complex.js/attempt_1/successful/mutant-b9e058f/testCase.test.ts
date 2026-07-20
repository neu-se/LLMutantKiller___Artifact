import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinity", () => {
  it("should return Infinity when adding an infinite complex number to a finite complex number", () => {
    // In the original code: Infinity + z = Infinity (when z is not Infinity)
    // The first check is: if (this.isInfinite() && z.isInfinite()) => NaN
    // The second check is: if (this.isInfinite() || z.isInfinite()) => Infinity
    // In the mutated code: the first check uses || instead of &&,
    // so Infinity + finite would incorrectly return NaN instead of Infinity
    
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    
    const result = inf.add(finite);
    
    // Original: result should be Infinity (not NaN)
    // Mutated: result would be NaN (because || triggers on first infinite operand)
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});