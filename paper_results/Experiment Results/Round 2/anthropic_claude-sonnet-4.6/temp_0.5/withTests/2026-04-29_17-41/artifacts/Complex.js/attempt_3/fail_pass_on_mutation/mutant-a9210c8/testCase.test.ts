import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex sech function", () => {
  it("should correctly compute sech for a purely imaginary number", () => {
    // sech(0 + 2i) = 1/cosh(2i) = 1/cos(2) (real value)
    const c = new Complex(0, 2);
    const result = c.sech();
    
    const expected = 1 / Math.cos(2);
    
    expect(result.re).toBeCloseTo(expected, 10);
    expect(result.im).toBeCloseTo(0, 10);
  });
});