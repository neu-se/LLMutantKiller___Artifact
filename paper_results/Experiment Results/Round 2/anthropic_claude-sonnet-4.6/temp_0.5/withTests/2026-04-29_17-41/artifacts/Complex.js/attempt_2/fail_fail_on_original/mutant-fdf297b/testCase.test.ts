import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return NaN when subtracting an infinite complex from a finite one", () => {
    // Original: if (this['isInfinite']() || z['isInfinite']()) return NaN  (first check)
    // Mutated:  if (this['isInfinite']() && z['isInfinite']()) return NaN  (first check)
    // When only z is infinite, mutated code skips first check and hits second check returning INFINITY
    
    const finite = new Complex(3, 4);
    const inf = Complex.INFINITY;
    
    // finite - Infinity: only z is infinite, so:
    // original (||): returns NaN immediately
    // mutated (&&): skips first check, hits second check (|| condition), returns INFINITY
    const result = finite.sub(inf);
    
    expect(result.isNaN()).toBe(true);
    expect(result.isInfinite()).toBe(false);
  });
});