import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("acsch with subnormal b where d underflows gives correct sign", () => {
    // In acsch: a=0, b=5e-324, d=0, b!==0
    // Original: new Complex(0, -b/0).asinh() = new Complex(0, -Inf).asinh()
    // Mutated:  new Complex(0, +b/0).asinh() = new Complex(0, +Inf).asinh()
    const result = new Complex(0, 5e-324).acsch();
    const resultNeg = new Complex(0, -5e-324).acsch();
    expect(isNaN(result.re)).toBe(false);
    expect(result.im).toBeCloseTo(-resultNeg.im, 5);
  });
});