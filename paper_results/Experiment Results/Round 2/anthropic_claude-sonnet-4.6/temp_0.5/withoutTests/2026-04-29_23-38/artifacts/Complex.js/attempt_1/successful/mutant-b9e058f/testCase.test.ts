import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex add method with infinity handling", () => {
  it("should return INFINITY when adding a finite number to INFINITY, not NaN", () => {
    // In the original code, the first check is:
    //   if (this['isInfinite']() && z['isInfinite']()) { return Complex['NAN']; }
    // Then:
    //   if (this['isInfinite']() || z['isInfinite']()) { return Complex['INFINITY']; }
    //
    // In the mutated code, the first check becomes:
    //   if (this['isInfinite']() || z['isInfinite']()) { return Complex['NAN']; }
    // This means Infinity + finite = NaN (wrong!)
    
    const inf = Complex.INFINITY;
    const finite = new Complex(3, 4);
    
    const result = inf.add(finite);
    
    // Original: Infinity + finite = Infinity
    // Mutant: Infinity + finite = NaN (because || makes the first condition true)
    expect(result.isInfinite()).toBe(true);
    expect(result.isNaN()).toBe(false);
  });
});