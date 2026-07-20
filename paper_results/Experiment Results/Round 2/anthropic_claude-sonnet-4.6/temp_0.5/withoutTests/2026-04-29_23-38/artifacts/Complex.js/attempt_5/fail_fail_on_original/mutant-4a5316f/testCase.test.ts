import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acoth", () => {
  it("should return positive imaginary part for acoth(0 - tiny*i) when d underflows", () => {
    // a=0, b=-5e-200: d underflows to 0, a===0 so re=0, b<0
    // Original: -b/0 = -(-5e-200)/0 = +Infinity → atanh(0+Inf*i) = i*pi/2 (positive im)
    // Mutated:  +b/0 = +(-5e-200)/0 = -Infinity → atanh(0-Inf*i) = -i*pi/2 (negative im)
    const result = new Complex(0, -5e-200).acoth();
    expect(result.im).toBeGreaterThan(0);
  });
});