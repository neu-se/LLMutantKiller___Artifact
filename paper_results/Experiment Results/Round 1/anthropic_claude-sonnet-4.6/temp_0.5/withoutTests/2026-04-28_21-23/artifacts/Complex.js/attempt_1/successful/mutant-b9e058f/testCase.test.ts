import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinite values", () => {
  it("should return Infinity when adding a finite number to Infinity, not NaN", () => {
    // In the original code, the first check is:
    //   if (this['isInfinite']() && z['isInfinite']()) return NaN
    // So Infinity + finite = Infinity
    //
    // In the mutated code, the first check is:
    //   if (this['isInfinite']() || z['isInfinite']()) return NaN
    // So Infinity + finite = NaN (wrong!)
    
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    
    const result = inf.add(finite);
    
    // Original: Infinity + finite = Infinity
    // Mutated: Infinity + finite = NaN (because mutated OR condition triggers NaN branch)
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});