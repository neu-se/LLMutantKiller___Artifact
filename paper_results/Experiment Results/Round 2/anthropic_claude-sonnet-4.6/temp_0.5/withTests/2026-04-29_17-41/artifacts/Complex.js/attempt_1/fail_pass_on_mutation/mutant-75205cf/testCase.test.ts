import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sub method", () => {
  it("should return a finite complex number when subtracting two finite complex numbers", () => {
    const a = new Complex(3, 4);
    const b = new Complex(1, 2);
    const result = a.sub(b);
    
    // The result should be a valid complex number (2 + 2i)
    // In the mutated code, the second if block returns Complex[""] which is undefined
    // causing the subtraction to fail or return undefined instead of the correct result
    expect(result).toBeDefined();
    expect(result.re).toBe(2);
    expect(result.im).toBe(2);
    
    // The result should be a proper Complex instance with isInfinite returning false
    expect(result.isInfinite()).toBe(false);
    expect(result.isNaN()).toBe(false);
  });
});