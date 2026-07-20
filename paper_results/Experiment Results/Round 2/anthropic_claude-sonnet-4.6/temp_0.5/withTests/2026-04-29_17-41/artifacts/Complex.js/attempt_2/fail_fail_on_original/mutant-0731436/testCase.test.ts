import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js"

describe("Complex asec", () => {
  it("should compute asec with subnormal inputs where d underflows to zero but b is non-zero", () => {
    // Use the smallest positive float so that b*b underflows to 0
    // making d = a*a + b*b = 0, but b !== 0
    // Original: imaginary part = -b/0 = -Infinity
    // Mutated: imaginary part = 0 (because (false) ? -b/0 : 0)
    const tiny = 5e-324; // Number.MIN_VALUE
    const c = new Complex(0, tiny);
    const result = c.asec();
    // In original: new Complex(0, -Infinity).acos() is called
    // In mutated: new Complex(0, 0).acos() is called
    // These produce different results
    const originalPath = new Complex(0, -Infinity).acos();
    expect(result.re).toBeCloseTo(originalPath.re, 5);
    expect(result.im).toBeCloseTo(originalPath.im, 5);
  });
});