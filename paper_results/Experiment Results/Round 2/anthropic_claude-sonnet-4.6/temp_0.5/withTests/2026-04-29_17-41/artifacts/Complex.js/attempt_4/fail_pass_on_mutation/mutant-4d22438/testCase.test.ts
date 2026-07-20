import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex abs large number branch", () => {
  it("abs of complex number with large imaginary greater than real part should be correct", () => {
    // Use values where |im| > |re| and both >= 3000 to trigger the a < b branch in hypot
    // hypot(3001, 6000): a=3001, b=6000, a<b so enters branch
    // original: b = 6000/3001, result = 6000*sqrt(1+(6000/3001)^2) ≈ 6709.8
    // mutated: b = 6000*3001 = 18006000, result = 6000*sqrt(1+18006000^2) ≈ enormous
    const c = new Complex(3001, 6000);
    const expected = Math.sqrt(3001 * 3001 + 6000 * 6000);
    const result = c.abs();
    expect(result).toBeCloseTo(expected, 1);
  });
});