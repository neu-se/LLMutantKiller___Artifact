import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech function", () => {
  it("should correctly compute asech of a complex number 2 + i", () => {
    // asech(2 + i): with correct b = im = 1
    // d = 4 + 1 = 5, result = acosh(2/5, -1/5)
    // With mutated b = undefined: d = NaN, result = NaN
    const c = new Complex(2, 1);
    const result = c.asech();
    
    // Verify the result is not NaN
    expect(result.isNaN()).toBe(false);
    
    // Verify imaginary part is correct
    // asech(2+i) computed via: acosh((2-i)/5)
    const inv = new Complex(2, 1).inverse();
    const expected = inv.acosh();
    
    expect(result.re).toBeCloseTo(expected.re, 8);
    expect(result.im).toBeCloseTo(expected.im, 8);
  });
});