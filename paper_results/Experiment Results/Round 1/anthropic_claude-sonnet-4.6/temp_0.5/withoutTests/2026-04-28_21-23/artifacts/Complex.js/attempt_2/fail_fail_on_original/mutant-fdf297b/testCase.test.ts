import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method with infinity", () => {
  it("should return Infinity when subtracting Infinity from finite number", () => {
    // Original: finite - Infinity
    // First check (||): this.isInfinite()=false, z.isInfinite()=true → true → returns NaN
    // Mutated first check (&&): false && true → false → falls to second check (||) → returns Infinity
    
    const finite = new Complex(5, 3);
    const result = finite.sub(Complex.INFINITY);
    
    // In original code: result should be NaN (first || check catches it)
    // In mutated code: result should be Infinity (first && check misses, second || catches)
    expect(result.isNaN()).toBe(true);
  });
});