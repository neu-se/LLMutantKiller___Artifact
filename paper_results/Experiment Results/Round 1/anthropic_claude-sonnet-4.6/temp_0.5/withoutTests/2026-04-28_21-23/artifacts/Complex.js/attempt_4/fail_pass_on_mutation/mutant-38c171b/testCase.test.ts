import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("detects mutation in acsch else branch", () => {
    // Use a=1e-200, b=-1e-200 so d underflows to 0
    // a !== 0, so re = 0 (not NaN)
    // b < 0, so original im = -(-1e-200)/0 = +Infinity
    // mutated im = 0
    // original: new Complex(0, Infinity).asinh()
    // mutated: new Complex(0, 0).asinh() = {re:0, im:0}
    const c = new Complex(1e-200, -1e-200);
    const result = c.acsch();
    // Original gives NaN (from asinh of complex with Infinity)
    // Mutated gives {re:0, im:0}
    expect(result.isNaN()).toBe(true);
  });
});