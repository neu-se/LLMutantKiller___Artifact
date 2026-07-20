import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch mutation detection", () => {
  it("detects mutation in acsch when d=0 with non-zero b via subnormal underflow", () => {
    // Use extremely small values so a*a + b*b underflows to 0
    const tiny = 5e-324; // smallest positive float (Number.MIN_VALUE)
    const c = new Complex(0, tiny);
    const result = c.acsch();
    // b !== 0 is true, so original: im = -b/0 = -Infinity → asinh gets complex with -Infinity im
    // mutated: im = 0 → asinh gets complex with 0 im
    // These produce different results
    expect(isFinite(result.re) || isFinite(result.im) || isNaN(result.re)).toBeDefined();
    // More specifically, original should give Infinity or specific value
    const mutatedResult = new Complex(0, 0).asinh(); // what mutated would compute
    const originalArg = new Complex(0, -Infinity); // what original computes before asinh  
    const originalResult = originalArg.asinh();
    expect(result.re).toBeCloseTo(originalResult.re, 5);
    expect(result.im).toBeCloseTo(originalResult.im, 5);
  });
});