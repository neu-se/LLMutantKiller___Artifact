describe("cosh fallback function", () => {
  it("should use correct formula (e^x + e^-x)/2 not (e^x + e^x)/2 for large x", () => {
    const originalCosh = Math.cosh;
    // @ts-ignore
    delete Math.cosh;
    
    jest.resetModules();
    
    const Complex = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    // Restore Math.cosh
    Math.cosh = originalCosh;
    
    // cos(0 + 2i) = cosh(2) in real part
    // Original cosh(2) = (e^2 + e^-2)/2 ≈ 3.7622
    // Mutated cosh(2) = (e^2 + e^2)/2 = e^2 ≈ 7.3891
    const z = new Complex(0, 2);
    const result = z.cos();
    
    const expected = (Math.exp(2) + Math.exp(-2)) * 0.5;
    expect(result.re).toBeCloseTo(expected, 10);
  });
});