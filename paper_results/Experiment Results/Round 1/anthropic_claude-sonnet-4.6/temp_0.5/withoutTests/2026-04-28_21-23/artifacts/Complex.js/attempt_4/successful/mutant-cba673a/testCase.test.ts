describe("Complex cosh fallback behavior difference", () => {
  it("original fallback returns correct value for large x while mutant returns undefined", () => {
    // Since Math.cosh exists in Node.js, we need to temporarily remove it
    // before the module loads to test the fallback path.
    // Instead, let's verify behavior through the module's exported functions
    // that depend on cosh being correct.
    
    // The only way to detect this is if Math.cosh didn't exist at module load time.
    // Since we can't control that, let's verify the module loaded correctly
    // by testing a computation that would differ if cosh returned undefined vs a number.
    
    // Actually - let's use jest.resetModules and delete Math.cosh before reimporting
    jest.resetModules();
    const originalCosh = Math.cosh;
    // @ts-ignore  
    Math.cosh = undefined;
    
    const Complex2 = require("../../../../../../../../../../../subject_repositories/Complex.js/complex.js");
    
    Math.cosh = originalCosh;
    
    // Now test: sinh(1 + i) uses cosh(1) internally
    // Original fallback: cosh(1) = (e + 1/e)/2 ≈ 1.5430...
    // Mutant fallback: cosh(1) = undefined
    const c = new Complex2(1, 1);
    const result = c.sinh();
    
    // im = cosh(a) * sin(b) = cosh(1) * sin(1)
    // Original: ≈ 1.5430... * 0.8414... ≈ 1.2984...
    // Mutant: undefined * sin(1) = NaN
    expect(isNaN(result.im)).toBe(false);
    expect(result.im).toBeCloseTo(Math.cosh(1) * Math.sin(1), 10);
  });
});