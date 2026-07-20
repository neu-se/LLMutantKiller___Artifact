import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of NaN+1i should not return zero", () => {
    const result = new Complex(NaN, 1).acsc();
    // Original: constructs Complex(0, -Infinity).asin() -> non-zero result
    // Mutated: constructs Complex(0, 0).asin() -> 0+0i
    expect(result.re === 0 && result.im === 0).toBe(false);
  });
});