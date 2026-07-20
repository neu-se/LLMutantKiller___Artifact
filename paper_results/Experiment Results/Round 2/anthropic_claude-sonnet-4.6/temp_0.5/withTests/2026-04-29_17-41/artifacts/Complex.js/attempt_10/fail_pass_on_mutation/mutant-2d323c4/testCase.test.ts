import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch for purely imaginary input matching known value", () => {
    const result = new Complex(0, 2).acsch();
    // d = 0 + 4 = 4, first branch: Complex(0/4, -2/4).asinh() = Complex(0, -0.5).asinh()
    // asinh(0 - 0.5i) = -i * asin(0.5) = -i * pi/6
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});