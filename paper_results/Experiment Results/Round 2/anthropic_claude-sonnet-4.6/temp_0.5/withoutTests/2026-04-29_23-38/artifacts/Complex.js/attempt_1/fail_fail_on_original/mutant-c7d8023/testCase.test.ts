import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch of a purely imaginary number correctly", () => {
    // acsch(i) = -i * pi/2
    // For z = i (a=0, b=1), d = 0 + 1 = 1 != 0
    // So we take the (d !== 0) branch: new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // asinh(0 - i) = -i*pi/2
    const result = new Complex(0, 1).acsch();
    // acsch(i) = log(1/i + sqrt(1 - 1/i^2)) = log(-i + sqrt(1+1)) = log(sqrt(2) - i)
    // The imaginary part should be -pi/4
    expect(result.re).toBeCloseTo(Math.log(1 + Math.sqrt(2)), 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});