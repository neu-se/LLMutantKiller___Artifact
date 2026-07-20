import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch", () => {
  it("should compute acsch of a purely imaginary number correctly", () => {
    // acsch(i) = -i*pi/2
    // For z = i (re=0, im=1): d = 0 + 1 = 1 != 0
    // So we use new Complex(0/1, -1/1).asinh() = new Complex(0, -1).asinh()
    // asinh(-i) = -i*pi/2
    const z = new Complex(0, 1);
    const result = z.acsch();
    // acsch(i) should be -i*pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);

    // Also test with negative imaginary to check sign
    const z2 = new Complex(0, -1);
    const result2 = z2.acsch();
    // acsch(-i) = i*pi/2
    expect(result2.re).toBeCloseTo(0, 10);
    expect(result2.im).toBeCloseTo(Math.PI / 2, 10);
  });
});