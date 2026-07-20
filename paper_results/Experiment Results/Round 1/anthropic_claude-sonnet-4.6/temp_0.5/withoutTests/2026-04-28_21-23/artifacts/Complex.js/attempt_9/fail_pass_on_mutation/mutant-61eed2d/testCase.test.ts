import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex cot function", () => {
  it("cot uses cos(a) - cosh(b) which should give negative denominator for small values", () => {
    // cot denominator: Math.cos(a) - cosh(b)
    // For a=0, b=0: cos(0) - cosh(0) = 1 - 1 = 0 (division by zero)
    // For a=pi/4, b=0: cos(pi/2) - cosh(0) = 0 - 1 = -1
    const c = new Complex(Math.PI / 4, 0);
    const result = c.cot();
    // cot(pi/4) = cos(pi/4)/sin(pi/4) = 1
    expect(result.re).toBeCloseTo(1, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});