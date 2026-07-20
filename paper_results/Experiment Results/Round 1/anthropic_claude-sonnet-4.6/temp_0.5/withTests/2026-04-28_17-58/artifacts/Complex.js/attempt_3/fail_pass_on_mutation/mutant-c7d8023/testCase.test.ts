import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation via underflow in acsch fallback branch", () => {
    const tiny = Number.MIN_VALUE;
    // Verify that d underflows to 0
    expect(tiny * tiny + tiny * tiny).toBe(0);
    
    const z = new Complex(tiny, tiny);
    const result = z.acsch();
    
    // Original: d=0, uses -b/0=-Inf → asinh(Inf,-Inf) → (NaN,NaN)
    // Mutated:  d=0, uses 0        → asinh(Inf,0)    → (Inf,0)
    expect(isNaN(result.re)).toBe(true);
  });
});