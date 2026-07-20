import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch d=0 fallback branch", () => {
  it("detects mutation in acsch when a is non-zero and d underflows to zero", () => {
    // Use subnormal numbers: a and b so small that a*a + b*b === 0
    // but b !== 0 (so early return is skipped) and a !== 0
    const tiny = 5e-324; // smallest positive double (subnormal)
    // tiny * tiny === 0 due to underflow
    // So d = tiny*tiny + tiny*tiny === 0
    // b !== 0, so early return is skipped
    // d === 0, so we hit the fallback
    // Original: (a !== 0) ? a/0 : 0 => Infinity (since a = tiny !== 0)
    // Mutated:  (a === 0) ? a/0 : 0 => 0 (since a !== 0)
    // Then .asinh() is called on Complex(Infinity, tiny/0=Infinity) vs Complex(0, 0)
    const result = new Complex(tiny, tiny).acsch();
    // Original: Complex(Infinity, Infinity).asinh() => should be infinite/NaN-like
    // Mutated: Complex(0, 0).asinh() => should be 0
    // So result.re should NOT be 0 in original
    expect(result.re).not.toBe(0);
  });
});