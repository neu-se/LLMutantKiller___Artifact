import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asinh", () => {
  it("should not mutate the original complex number after calling asinh", () => {
    // Create a complex number with both re and im parts
    const c = new Complex(1, 2);
    
    // Store original values
    const originalRe = c.re;
    const originalIm = c.im;
    
    // Call asinh - this should not permanently modify 'this'
    c.asinh();
    
    // The original complex number should be unchanged after asinh
    expect(c.re).toBe(originalRe);
    expect(c.im).toBe(originalIm);
  });
});