import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal values where d underflows to zero should produce Infinity real part via original fallback", () => {
    // Number.MIN_VALUE squared underflows to 0, triggering the d===0 branch
    // b !== 0 so we don't hit the early return
    // Original: re = (a !== 0) ? a/0 : 0 = Infinity; asinh(Infinity + (-Infinity)i)
    // Mutant:   re = (false) ? a/0 : 0 = 0; asinh(0 + (-Infinity)i)
    const tiny = Number.MIN_VALUE;
    const c = new Complex(tiny, tiny);
    // Verify d underflows
    const d = tiny * tiny + tiny * tiny;
    expect(d).toBe(0); // confirm we hit the fallback branch
    const result = c.acsch();
    // Original path: asinh(Infinity - Infinity*i) - real part should not be 0
    // Mutant path: asinh(0 - Infinity*i) - different result
    expect(result.re).not.toBe(0);
  });
});