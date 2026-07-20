import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting a finite number from Infinity", () => {
    // In the original code, the first check is:
    //   if (this['isInfinite']() || z['isInfinite']()) { return NaN; }
    // In the mutated code, the first check is:
    //   if (this['isInfinite']() && z['isInfinite']()) { return NaN; }
    // Then the second check (which was originally for Infinity - finite = Infinity) becomes:
    //   if (this['isInfinite']() || z['isInfinite']()) { return Infinity; }
    // So in the mutated code, Infinity - finite = Infinity (wrong), 
    // but in the original code, Infinity - finite = NaN (correct per the original logic)
    
    const result = Complex.INFINITY.sub(new Complex(1, 0));
    
    // In the original code: Infinity - finite triggers the first || check -> returns NaN
    // In the mutated code: Infinity - finite does NOT trigger the first && check (only one is infinite),
    //   then falls to the second || check -> returns Infinity
    expect(result.isNaN()).toBe(true);
  });
});