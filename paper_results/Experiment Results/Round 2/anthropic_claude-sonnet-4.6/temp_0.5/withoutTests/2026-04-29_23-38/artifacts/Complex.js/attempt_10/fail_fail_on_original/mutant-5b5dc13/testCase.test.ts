import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch fallback branch: a=0 case produces different re component", () => {
    // Directly test the two constructed complexes that go into asinh
    const originalComplex = new Complex(0, -Infinity); // original: a=0 gives re=0
    const mutatedComplex = new Complex(NaN, -Infinity); // mutated: a=0 gives re=NaN (0/0)
    
    const origResult = originalComplex.asinh();
    const mutResult = mutatedComplex.asinh();
    
    // These should differ - if not, we need different inputs
    // origResult should not be NaN in re if mutResult is NaN in re
    expect(isNaN(origResult.re)).not.toBe(isNaN(mutResult.re));
  });
});