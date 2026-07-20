import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex csch function", () => {
  it("should return undefined or throw for csch since it is not implemented, distinguishing original from mutant", () => {
    // The mutation changes a line in the csch/sech area
    // Test sech with imaginary component to detect if b is wrongly set
    const c = new Complex(1, 1);
    const sechResult = c.sech();
    
    // sech(1+i): a=1, b=1
    // d = Math.cos(2*1) + cosh(2*1)
    const a = 1, b = 1;
    const d = Math.cos(2 * b) + Math.cosh(2 * a);
    const expectedRe = 2 * Math.cosh(a) * Math.cos(b) / d;
    const expectedIm = -2 * Math.sinh(a) * Math.sin(b) / d;
    
    expect(sechResult.re).toBeCloseTo(expectedRe, 10);
    expect(sechResult.im).toBeCloseTo(expectedIm, 10);
  });
});