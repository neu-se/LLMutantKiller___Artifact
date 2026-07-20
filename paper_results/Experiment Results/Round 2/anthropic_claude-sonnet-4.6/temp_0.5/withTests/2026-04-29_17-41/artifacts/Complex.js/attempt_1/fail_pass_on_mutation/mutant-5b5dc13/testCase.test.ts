import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number where a=0 and b!=0", () => {
    // acsch(i) = acsch(0 + 1i)
    // When a=0, b=1: d = 0 + 1 = 1 != 0
    // Takes d !== 0 branch: new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // The mutation affects the d===0 branch where a=0
    // To expose the mutation, we need d===0 with b!=0, which is impossible normally
    // Instead test that acsch(0+bi) gives correct results
    const result = new Complex(0, 2).acsch();
    // acsch(2i) = asinh(1/(2i)) = asinh(-i/2)
    // asinh(-i/2) = log(-i/2 + sqrt(1 - 1/4)) = log(-i/2 + sqrt(3/4))
    // = log(sqrt(3)/2 - i/2)
    const expected = new Complex(0, -Math.PI / 6);
    expect(result.re).toBeCloseTo(expected.re, 10);
    expect(result.im).toBeCloseTo(expected.im, 10);
  });
});