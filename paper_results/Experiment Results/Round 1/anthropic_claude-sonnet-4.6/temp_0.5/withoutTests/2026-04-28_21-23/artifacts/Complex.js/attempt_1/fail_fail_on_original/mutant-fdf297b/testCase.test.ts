import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting finite number from Infinity", () => {
    // In the original code, the first check is:
    //   if (this['isInfinite']() || z['isInfinite']()) return NaN
    // In the mutated code, the first check is:
    //   if (this['isInfinite']() && z['isInfinite']()) return NaN
    // This means in the mutated code, Infinity - finite falls through to the second check
    // which also uses || and returns Infinity, but the original returns NaN for Infinity - finite.
    
    // Original: Infinity - 1 = NaN (because first check: isInfinite() || isInfinite() = true)
    // Mutated: Infinity - 1 = Infinity (because first check: isInfinite() && isInfinite() = false, falls to second check)
    
    const result = Complex.INFINITY.sub(new Complex(1, 0));
    expect(result.isNaN()).toBe(true);
  });
});