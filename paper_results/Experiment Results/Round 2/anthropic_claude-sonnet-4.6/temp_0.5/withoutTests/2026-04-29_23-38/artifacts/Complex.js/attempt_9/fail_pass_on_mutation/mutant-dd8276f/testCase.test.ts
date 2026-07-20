import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc mutation detection", () => {
  it("acsc of very small complex number where d underflows should not return exactly zero", () => {
    // With a=1e-200, b=1e-200, d underflows to 0
    // Original: -b/0 = -Infinity -> complex result with NaN
    // Mutated: 0 -> asin(0+0i) = {re:0, im:0}
    const result = new Complex(1e-200, 1e-200).acsc();
    const isZero = result.re === 0 && result.im === 0;
    expect(isZero).toBe(false);
  });
});