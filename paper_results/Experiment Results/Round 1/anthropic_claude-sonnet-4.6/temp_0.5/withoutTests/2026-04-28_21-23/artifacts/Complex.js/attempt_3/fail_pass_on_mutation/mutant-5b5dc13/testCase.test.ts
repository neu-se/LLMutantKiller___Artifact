import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("computes acsch correctly for a purely imaginary number", () => {
    // acsch(2i): goes through d !== 0 branch (d = 4)
    // 1/(2i) = -i/2, so acsch(2i) = asinh(-i/2) = -i*asin(1/2) = -i*pi/6
    const result = new Complex(0, 2).acsch();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 6, 10);
  });
});