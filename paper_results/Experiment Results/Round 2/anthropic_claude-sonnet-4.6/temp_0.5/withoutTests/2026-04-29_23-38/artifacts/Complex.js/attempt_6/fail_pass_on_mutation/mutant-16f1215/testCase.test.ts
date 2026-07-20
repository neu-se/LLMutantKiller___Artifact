import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0 + bi) for normal b should use d!=0 branch and give correct result", () => {
    // For z = 2i: acsc(2i) = asin(1/(2i)) = asin(-i/2)
    // asin(-i/2): a=0, b=-0.5
    // t1 = sqrt((-0.5)^2 - 0^2 + 1, -2*0*(-0.5)) = sqrt(1.25, 0) = (sqrt(1.25), 0)
    // t2 = log(sqrt(1.25) - (-0.5), 0 + 0) = log(sqrt(1.25)+0.5, 0)
    // result = (t2.im, -t2.re) = (0, -log(sqrt(1.25)+0.5))
    const result = new Complex(0, 2).acsc();
    // acsc(2i) should have re=0 and im = -asinh(0.5) approximately
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.log(0.5 + Math.sqrt(1.25)), 10);
  });
});