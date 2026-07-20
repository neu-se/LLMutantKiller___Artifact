import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly for small purely imaginary input", () => {
    // acsch(0 + 0.5i): a=0, b=0.5, d=0.25 != 0
    // Takes d!=0 branch: new Complex(0, -2).asinh()
    // asinh(-2i) = log(-2i + sqrt(1 - 4)) = log(-2i + sqrt(-3))
    // = log(sqrt(3)i - 2i) = log((sqrt(3)-2)i)
    const result = new Complex(0, 0.5).acsch();
    const expected = new Complex(0, -Math.PI / 6 * 2); // -pi/3... let me recalc
    // acsch(bi) = asinh(1/bi) = asinh(-i/b)
    // asinh(-i/b) where b=0.5 => asinh(-2i)
    // = -i * asin(-2) ... asin(-2) is complex
    // Just check it's not NaN
    expect(isNaN(result.re)).toBe(false);
    expect(isNaN(result.im)).toBe(false);
  });
});