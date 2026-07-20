import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acot", () => {
  it("should compute acot(0 + 2i) with correct imaginary sign", () => {
    // acot(2i) = atan(1/(2i)) = atan(-i/2)
    // The result should have negative imaginary part
    const result = new Complex(0, 2).acot();
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.log(3) / 2, 10);
  });
});