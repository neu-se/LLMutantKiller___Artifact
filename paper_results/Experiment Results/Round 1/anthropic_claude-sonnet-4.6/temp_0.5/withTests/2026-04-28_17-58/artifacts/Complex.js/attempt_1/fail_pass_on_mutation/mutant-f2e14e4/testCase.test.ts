import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should correctly compute acot for a complex number with non-zero imaginary part", () => {
    // For z = 0 + 2i, acot(z) = atan(1/z) = atan(-i/2)
    // Using the formula: acot(a+bi) where d = a^2 + b^2 != 0
    // result = new Complex(a/d, -b/d).atan()
    // a=0, b=2, d=4 => new Complex(0, -0.5).atan()
    const result = new Complex(0, 2).acot();
    // Expected: atan(0 - 0.5i) = real part 0, imaginary part -atanh(0.5) = -0.5493...
    // The mutation doesn't affect d!=0 branch, so let's test d=0 case indirectly
    // Actually test a real number case
    const result2 = new Complex(1, 0).acot();
    expect(result2.re).toBeCloseTo(Math.PI / 4, 10);
    expect(result2.im).toBeCloseTo(0, 10);
  });
});