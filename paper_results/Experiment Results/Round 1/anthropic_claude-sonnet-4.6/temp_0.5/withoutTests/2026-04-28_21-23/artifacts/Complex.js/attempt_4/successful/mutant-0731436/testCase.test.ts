import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asec", () => {
  it("should handle asec for extremely small imaginary component where d underflows to zero", () => {
    // With very small b, b*b underflows to 0, making d=0 while b!==0
    // Original: (b !== 0) ? -b/0 : 0 => -Infinity (since b > 0, -b/0 = -Infinity)
    // Mutated:  (false) ? -b/0 : 0   => 0
    const tiny = 5e-324; // smallest positive double
    const result = new Complex(0, tiny).asec();
    // In original: new Complex(0, -Infinity).acos() 
    // In mutated:  new Complex(0, 0).acos() = acos(0) = PI/2
    // These should differ
    const mutatedResult = new Complex(0, 0).acos();
    expect(result.re).not.toBeCloseTo(mutatedResult.re, 5);
  });
});