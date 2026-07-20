import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex mul", () => {
  it("should correctly multiply zero by a non-zero complex number", () => {
    const zero = new Complex(0, 0);
    const nonZero = new Complex(3, 4);
    
    // In the mutated code, z[""]() is called when this.isZero() is true,
    // which throws a TypeError since z[""] is undefined (not a function).
    // In the original code, z['isZero']() is called correctly.
    const result = zero.mul(nonZero);
    
    expect(result.re).toBe(0);
    expect(result.im).toBe(0);
  });
});