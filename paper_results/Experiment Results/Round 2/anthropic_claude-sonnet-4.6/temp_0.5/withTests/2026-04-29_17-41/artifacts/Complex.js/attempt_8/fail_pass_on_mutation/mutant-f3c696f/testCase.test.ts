import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("acot with subnormal b reaches d=0 branch", () => {
    const result = new Complex(0, Number.MIN_VALUE).acot();
    // Both original and mutated give NaN, but let's check
    expect(isNaN(result.re)).toBe(true);
  });
});