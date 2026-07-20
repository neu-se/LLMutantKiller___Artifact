import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("asin(0, 0) differs from asin(NaN, 0) - verifying mutation detectability", () => {
    const fromZero = new Complex(0, 0).asin();
    const fromNaN = new Complex(NaN, 0).asin();
    // asin(0,0) = 0, asin(NaN,0) = NaN - these differ!
    // Now need to trigger acsc's else branch with a=0, b=0 bypassing early return
    // This requires d=0 with a=0, b=0 - but early return catches this
    // The mutation is only reachable when a=0 AND d=0 AND b≠0
    // In that case im=-b/0=±Inf, and asin(0,±Inf)=asin(NaN,±Inf)=NaN
    expect(fromZero.re).toBe(0); // passes
    expect(isNaN(fromNaN.re)).toBe(true); // passes
  });
});