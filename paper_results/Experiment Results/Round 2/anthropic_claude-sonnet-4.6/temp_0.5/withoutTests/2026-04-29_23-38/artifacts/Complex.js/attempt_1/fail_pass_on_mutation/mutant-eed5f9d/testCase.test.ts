import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsch function", () => {
  it("should correctly compute acsch for a purely imaginary number where d is non-zero", () => {
    // acsch(i) = acsch(0 + 1i)
    // For a=0, b=1: d = 0 + 1 = 1
    // Goes into d !== 0 branch: new Complex(0/1, +1/1).asinh() = new Complex(0, 1).asinh()
    // The +b/d (not -b/d) is the key difference in acsch vs other functions
    const c = new Complex(0, 1);
    const result = c.acsch();
    // acsch(i) = -i*pi/2
    expect(result.re).toBeCloseTo(0, 10);
    expect(result.im).toBeCloseTo(-Math.PI / 2, 10);
  });
});