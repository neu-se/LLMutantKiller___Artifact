import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should differ between d!==0 and always-true ternary when d underflows", () => {
    // a=0, b=MIN_VALUE: d = 0 + MIN_VALUE^2 = 0 (underflow)
    // Original (d !== 0 is false): new Complex(0, -Infinity).atanh()
    // Mutated (true): new Complex(NaN, -Infinity).atanh()
    const result = new Complex(0, Number.MIN_VALUE).acoth();
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});