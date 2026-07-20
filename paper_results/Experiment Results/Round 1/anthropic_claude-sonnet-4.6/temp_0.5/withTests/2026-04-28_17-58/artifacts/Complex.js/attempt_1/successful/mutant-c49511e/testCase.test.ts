import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csc function", () => {
  it("should correctly compute the cosecant of a complex number", () => {
    // csc(z) = 1/sin(z)
    // For z = 1 + i, we can verify csc(z) = 1/sin(z)
    const z = new Complex(1, 1);
    const result = z.csc();
    
    // The mutation changes `var a = this['re']` to `var b = this[""]` (undefined)
    // This means 'a' will be undefined in the mutated code, causing incorrect results
    // In the original: a = this['re'] = 1
    // In the mutant: a is not defined (the line is replaced by setting b to undefined)
    
    // Expected values: csc(1+i) = 1/sin(1+i)
    // sin(1+i) = sin(1)*cosh(1) + i*cos(1)*sinh(1)
    const sinZ = z.sin();
    const expected = new Complex(1, 0).div(sinZ);
    
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});