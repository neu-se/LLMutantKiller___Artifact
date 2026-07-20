import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should correctly compute acsch for a purely imaginary number where b !== 0", () => {
    // For z = i (re=0, im=1), d = 0*0 + 1*1 = 1 != 0
    // acsch(i) = asinh(1/i) = asinh(-i)
    // The result should have a non-trivial imaginary part
    const z = new Complex(0, 1);
    const result = z.acsch();
    // acsch(i) = -i * pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});