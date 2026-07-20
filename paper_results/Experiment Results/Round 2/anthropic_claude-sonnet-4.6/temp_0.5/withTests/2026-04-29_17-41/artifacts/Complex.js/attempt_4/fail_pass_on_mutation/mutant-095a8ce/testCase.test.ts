import Complex from "../../../../../../../../../../../subject_repositories/Complex.js/complex.js";

describe("Complex acsc", () => {
  it("acsc(0+0i) real part should equal PI/2 and imaginary part should be Infinity", () => {
    const c = new Complex(0, 0);
    const result = c.acsc();
    expect(result.re).toBeCloseTo(Math.PI / 2);
    expect(!isFinite(result.im) && result.im > 0).toBe(true);
  });
});