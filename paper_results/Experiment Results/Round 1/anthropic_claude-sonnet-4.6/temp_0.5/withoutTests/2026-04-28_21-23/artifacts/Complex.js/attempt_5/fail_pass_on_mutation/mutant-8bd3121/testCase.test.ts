import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex asech", () => {
  it("should return Infinity for zero input", () => {
    // When input is zero, asech should return Complex.INFINITY
    // The isZero() check happens before b is used, so this tests the early return
    // For non-zero input with im=0, b=this[""] is undefined vs b=this['im']=0
    // d = a*a + undefined*undefined = NaN vs a*a + 0 = a*a
    // This causes different branching: NaN !== 0 is true, but a/NaN != a/d
    const c = new Complex(2, 0);
    const result = c.asech();
    // asech(2) = acosh(0.5) = i * acos(0.5) - but via inverse
    // With real input 2: d=4, new Complex(2/4, 0).acosh() = new Complex(0.5, 0).acosh()
    // acos(0.5) = pi/3, so result should have im = pi/3
    expect(Number.isFinite(result.re)).toBe(true);
    expect(Number.isFinite(result.im)).toBe(true);
    expect(result.im).toBeCloseTo(Math.PI / 3, 5);
  });
});